/*
 * Implementation of the ISyncProtocol
 * https://github.com/dfahlander/Dexie.js/wiki/Dexie.Syncable.ISyncProtocol
 */
export default function initSync(serverComm, isOnline) {
  return function sync(
    context,
    url,
    options,
    baseRevision,
    syncedRevision,
    changes,
    partial,
    applyRemoteChanges,
    onChangesAccepted,
    onSuccess,
    onError
  ) {
    let observer = options.hasOwnProperty('observer') ? options.observer : false;

    const request = {
      // Will not be defined the first time we call the server
      clientIdentity: context.clientIdentity,
      baseRevision: options.baseRevision ? options.baseRevision : baseRevision,
      partial,
      changes: observer ? [] : changes,
      syncedRevision: options.syncedRevision ? options.syncedRevision : syncedRevision,
    }; 

    serverComm(url, request, options)
        .then((remoteData) => {
          // TODO: remove from data.changes array tables (table) that don't match options.tables

          if (!remoteData.success) {
            // Server didn't accept our changes. Stop trying to sync
            onError(remoteData.errorMessage, Infinity);
          } else {
            let data = remoteData;

            if (options.table) {
              data.changes = remoteData.changes.filter( change => {
               return change.table === options.table;
              });
            }
              // If we have no clientIdentity yet, then this was the first call
            // Make sure we save the clientIdentity and then schedule the next call
            if (!context.clientIdentity) {
              context.clientIdentity = data.clientIdentity;
              context.save()
                  .then(() => {
                    applyRemoteChanges(data.changes, data.currentRevision, data.partial, false);
                    onChangesAccepted();
                    onSuccess({ again: options.pollInterval });
                  }).catch((e) => {
                // We failed to save the clientIdentity. Stop trying to sync
                // We would not be able to get/send any partial data
                    onError(e, Infinity);
                  });
              // This is a subsequent call.
              // We already have a clientIdentity so we can just schedule the next call
            } else {
              applyRemoteChanges(data.changes, data.currentRevision, data.partial, false);
              onChangesAccepted();
              onSuccess({ again: options.pollInterval });
            }
          }
        })
        .catch((e) => {
          isOnline(url)
              .then((status) => {
                if (status) { // We were temporarily offline -> retry
                  onError(e, options.pollInterval);
                } else { // Was probably not just a temp thing -> stop retrying
                  // Synable will automatically disconnect us with an ERROR
                  // and we will have to manually reconnect
                  onError(e, Infinity);
                }
              });
        });
  };
}
