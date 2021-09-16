import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class FilterMoviesLwc extends NavigationMixin(LightningElement) {
    moviesearched;

      createNewMovie() {
        this[NavigationMixin.Navigate]({
          type: 'standard__objectPage',
          attributes: {
            objectApiName: 'Movie__c',
            actionName: 'new'
          },
          state: {
            defaultFieldValues: '',
            nooverride: '1'
          }
        });
      }

    searchMovies() {
        console.log('movie searched :'+this.moviesearched)
        this.template.querySelector('c-movies-results-lwc').searchMovies(this.moviesearched);
    }
    changeword(event){
        console.log('achaq' + event.target.value);
        this.moviesearched = event.target.value;
    }
}