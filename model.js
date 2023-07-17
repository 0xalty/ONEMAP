// Class definition

class UFO {
		
	constructor( data ) {
		this.icon = data.icon;
		this.type = data.type;
		this.x = data.x;
		this.y = data.y;
		this.date = data.date;
		this.comment = data.comment;
		this.image = data.image;
		this.rarelity = data.rarelity;
		this.GeolocationPosition = data.GeolocationPosition
	}

	// showComment() {
	// 	alert( this.comment );
	// }

	link() {
		location.href = this.GeolocationPosition;
	}
	
};


// Instantiation

objects =[];

for ( let i = 0, l = dataArray.length; i < l; i++ ) {
	
	const object = new UFO( dataArray[ i ] );
	
	objects.push( object );

};