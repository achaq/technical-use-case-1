import { LightningElement,wire, track } from 'lwc';
import { subscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import MOVIEMC from '@salesforce/messageChannel/MovieMessageChannel__c';
import { getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';

import MOVIE_ID_FIELD from '@salesforce/schema/Movie__c.Id';
import MOVIE_NAME_FIELD from '@salesforce/schema/Movie__c.Name';
import MOVIE_RELEASE_FIELD from '@salesforce/schema/Movie__c.Release_Date__c';
const MOVIE_FIELDS = [MOVIE_ID_FIELD, MOVIE_NAME_FIELD,MOVIE_RELEASE_FIELD];
export default class MoviePreviewLwc extends LightningElement {

    url = "https://pbs.twimg.com/media/ESNhDyHWsAATd_a.jpg";
    movieId;
    @track
    editing =false;
    @wire(MessageContext)
    messageContext;
    

    @wire(getRecord, {recordId: '$movieId', fields: MOVIE_FIELDS})
    wiredRecord;


    subscribeMC() {
        // Subscribe to the message channel to retrieve the recordId and explicitly assign it to boatId.
        this.subscription = subscribe(
            this.messageContext,
            MOVIEMC,
            (message) => { this.movieId = message.recordId },
            { scope: APPLICATION_SCOPE }
        );
        console.log('from subscribe' + this.movieId);
    }


      connectedCallback() {
        this.subscribeMC();
      }

      handleEdit(event){
        console.log('we are editing' + this.editing);
        this.editing=true;
        console.log('we are editing' + this.editing);

      }

      handleReset(event){
        console.log('we are editing' + this.editing);
        this.editing = false;
        onsole.log('we are editing' + this.editing);

      }



    deleteMovie(event) {
        console.log('delete  +?' + this.movieId);
        deleteRecord(this.movieId)
            .then(() => {
                console.log('deleted' + this.movieId);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Movie deleted',
                        variant: 'success'
                    })
                );
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: 'there is an error',
                        variant: 'error'
                    })
                );
            });
    }
}