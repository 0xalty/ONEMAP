masterPane = document.getElementById( 'masterpane' );
detailPanel = document.getElementById( 'detailpanel' );


loadMaster( objects );


document.body.addEventListener( 'click', function() {
	
	closeDetailPanel();
	
} );


window.addEventListener( 'resize', function() {
	
	const selectedMasterItemElement = masterPane.querySelector( '.masteritem-selected' );
	
	if ( selectedMasterItemElement ) {
		openDetailPanel( selectedMasterItemElement );
	}
	
} );


function loadMaster( objects ) {
	
	const masterItemTemplate = document.getElementById( 'masteritemtemplate' );
	
	if ( !masterItemTemplate ) return;

	for ( let i = 0; i < objects.length; i++ ) {

		const object = objects[ i ];
		
		const masterItemElement = masterItemTemplate.content.firstElementChild.cloneNode( true );
		
		const textContentElements = masterItemElement.querySelectorAll( '[data-key]' );
		
		for ( let j = 0; j < textContentElements.length; j++ ) {
			
			const textContentElement = textContentElements[ j ];
			
			const key = textContentElement.getAttribute( 'data-key' );
			
			textContentElement.textContent = object[ key ];
			
		};

		const attrElements = masterItemElement.querySelectorAll( '[data-attr-key]' );

		for ( let j = 0; j < attrElements.length; j++ ) {
			const attrElement = attrElements[ j ];
			const attrKey = attrElement.getAttribute( 'data-attr-key' );
			if ( attrKey ) {
				const key = attrElement.getAttribute( 'data-key' );
				attrElement.setAttribute( attrKey,  object[ key ] );
			}
		};

		if ( object.x != undefined ) masterItemElement.style.left = object.x + '%';
		if ( object.y != undefined ) masterItemElement.style.top = object.y + '%';

		masterItemElement.addEventListener( 'click', function( event ) {
			selectMasterItem( i );
			loadDetail( object );
			openDetailPanel( masterItemElement );
			event.stopPropagation();
		} );

		masterPane.appendChild( masterItemElement );
		
	}

}


function selectMasterItem( index ) {
	
	const masterItemElements = masterPane.querySelectorAll( '.masteritem' );
	
	for ( let i = 0; i < masterItemElements.length; i++ ) {
		
		const masterItemElement = masterItemElements[ i ];
		
		if ( i == index ) {
			masterItemElement.classList.add( 'masteritem-selected' );
		} else {
			masterItemElement.classList.remove( 'masteritem-selected' );
		}
		
	}

}


function loadDetail( object ) {

	detailPanel.innerHTML = '';

	const detailTemplate = document.getElementById( 'detailtemplate' );
	
	if ( !detailTemplate ) return;
	
	const detailElement = detailTemplate.content.firstElementChild.cloneNode( true );
	
	const textContentElements = detailElement.querySelectorAll( '[data-key]' );
	
	for ( let i = 0; i < textContentElements.length; i++ ) {
		const textContentElement = textContentElements[ i ];
		const key = textContentElement.getAttribute( 'data-key' );
		textContentElement.textContent = object[ key ];
	};

	const attrElements = detailElement.querySelectorAll( '[data-attr-key]' );

		for ( let j = 0; j < attrElements.length; j++ ) {
			const attrElement = attrElements[ j ];
			const attrKey = attrElement.getAttribute( 'data-attr-key' );
			if ( attrKey ) {
				const key = attrElement.getAttribute( 'data-key' );
				attrElement.setAttribute( attrKey,  object[ key ] );
			}
		};
	
	const actionElements = detailElement.querySelectorAll( '[data-action]' );
	
	for ( let j = 0; j < actionElements.length; j++ ) {
		const actionElement = actionElements[ j ];
		const action = actionElement.getAttribute( 'data-action' );
		if ( object[ action ] ) {
			actionElement.addEventListener( 'click', function() {
				object[ action ]();
			} );
		}
	};
	
	detailPanel.appendChild( detailElement );

}


function openDetailPanel( masterItemElement ) {
	
	detailPanel.classList.add( 'detailpanel-visible' );
	
	const detailPanelWidth = detailPanel.offsetWidth;
	const masterItemElementX = masterItemElement.offsetLeft;
	const masterItemElementY = masterItemElement.offsetTop;
	const masterItemElementWidth = masterItemElement.offsetWidth;
	const masterItemElementHeight = masterItemElement.offsetHeight;
	const destinationX = masterItemElementX + ( masterItemElementWidth / 2 ) - ( detailPanelWidth / 2 );
	const destinationY = masterItemElementY + masterItemElementHeight;

	detailPanel.style.left = destinationX + 'px';
	detailPanel.style.top = destinationY + 'px';

}


function closeDetailPanel() {
	
	detailPanel.classList.remove( 'detailpanel-visible' );
	
	const selectedMasterItemElement = masterPane.querySelector( '.masteritem-selected' );

	if ( selectedMasterItemElement ) {
		selectedMasterItemElement.classList.remove( 'masteritem-selected' );
	}
	
}

