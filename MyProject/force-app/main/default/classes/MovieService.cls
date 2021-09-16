public with sharing class MovieService {
    @AuraEnabled(cacheable=true)
    public static List<Movie__C> getMovies(String moviesearched) {
        String query = 'SELECT '
                     + 'Name, Description__c, Category__c, Release_Date__c '
                     + 'FROM Movie__c';

        if (String.isNotBlank(moviesearched)) {
            moviesearched='%'+moviesearched +'%';
            query += ' WHERE Name LIKE :moviesearched';
        }
        return Database.query(query);
    }
}
