import { LightningElement,api } from 'lwc';
const TILE_WRAPPER_SELECTED_CLASS = 'tile-wrapper selected';
const TILE_WRAPPER_UNSELECTED_CLASS = 'tile-wrapper';
export default class MovieTile extends LightningElement {

    @api
    movie;
    @api
    selectedMovieId;

       // Getter for dynamically setting the tile class based on whether the
    // current boat is selected
    get tileClass() {
        if (this.movie.Id == this.selectedMovieId) {
            return TILE_WRAPPER_SELECTED_CLASS;
        }
        return TILE_WRAPPER_UNSELECTED_CLASS;
    }
    
    // Fires event with the Id of the boat that has been selected.
    selectMovie() {
        this.selectedMovieId = this.movie.Id;
        const movieselect = new CustomEvent('movieselect', {
            detail: {
                movieId: this.selectedMovieId
            }
        });
        this.dispatchEvent(movieselect);
    }
}