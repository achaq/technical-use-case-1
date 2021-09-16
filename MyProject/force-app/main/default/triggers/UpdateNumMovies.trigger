trigger UpdateNumMovies on  MovieActor__c (after insert) {

    List<Actor__c> actorstoupdate = new List<Actor__c>();
    List<Movie__c> moviestoupdate = new List<Movie__c>();
    for (MovieActor__c mactor : Trigger.new){

        String actorId = mactor.Actor__c;
        String movieId = mactor.Movie__c;
        Integer males = 0;
        Integer females = 0;
        Actor__c actor = [select Id, Number_of_movies__c from Actor__c where Id =:actorId ];
        Movie__c movie = [select Id from Movie__c where Id =:movieId];

        for (MovieActor__c  mactor2:[Select Actor__r.Gender__c from MovieActor__c where movie__c =:movieId] ){
            if (mactor2.Actor__r.Gender__c){
            males++;}
            else {
                females++;
            }
        }

        

        // gender %
        movie.MaleActorsPercentage__c = males*100/(males+females);
        movie.FemaleActorsPercentage__c = females*100/(males+females);



        // Number of movies        
        if (actor.Number_of_movies__c == null){
            actor.Number_of_movies__c = 0;
        }
        else{
            actor.Number_of_movies__c += 1;

        }



        actorstoupdate.add(actor);
        moviestoupdate.add(movie);
    }

    update moviestoupdate;
    update actorstoupdate;
}