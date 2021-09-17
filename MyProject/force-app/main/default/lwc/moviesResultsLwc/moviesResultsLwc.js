import { api, LightningElement, track, wire } from 'lwc';
import getMovies from '@salesforce/apex/MovieService.getMovies';
import { publish, MessageContext } from 'lightning/messageService';
import MOVIEMC from '@salesforce/messageChannel/MovieMessageChannel__c';

export default class MoviesResultsLwc extends LightningElement {
    @track
    moviesearched='' ;
    @api
    selectedMovieId;
    @track
    movies;
    @wire(MessageContext)
    messageContext;
    
    // wired getMovies method
    @wire(getMovies, {moviesearched: '$moviesearched'})
    wiredMovies({data, error}) {
        if (data) {
            this.movies = data;
            console.log('this movies' + this.movies)
        } else if (error) {
            console.log('data.error')
            console.log(error)
        }
    }


    @api
    searchMovies(moviesearched2) {
        console.log('in results : '+moviesearched2 )
        this.moviesearched = moviesearched2;
        console.log('in results 2: '+this.moviesearched )



    }

    updateSelectedTile(event) {
        this.selectedMovieId = event.detail.movieId;
        console.log('this is the selected Id'+ this.selectedMovieId);
        this.sendMessageService(this.selectedMovieId)
    }


    // Publishes the selected Movie Id on the MovieMC.
    sendMessageService(MovieId) { 
        // explicitly pass boatId to the parameter recordId
        console.log('we are sending it right away ' + MovieId);
        publish(this.messageContext, MOVIEMC, { recordId: MovieId });
        console.log('we are sending it right away 2' + MovieId);

    }


}