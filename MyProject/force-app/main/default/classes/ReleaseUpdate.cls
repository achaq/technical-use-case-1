global class ReleaseUpdate  implements Database.Batchable<sObject>, Schedulable {

    global Database.QueryLocator start(Database.BatchableContext BC) {

    String query = 'select id, Is_Released__c from Movie__c where Release_Date__c < today';

    return Database.getQueryLocator(query); 

}

    global void execute(Database.BatchableContext BC, List<Movie__c> scope) {

        for(Movie__c movie : scope)
    
        {
        movie.Is_Released__c = true;
        }
    
    update scope;
    
    }

    global void finish(Database.BatchableContext bc) {

    }

    global void execute(SchedulableContext SC){
        ReleaseUpdate rel = new ReleaseUpdate();
        Database.executeBatch(rel);
    }
}
