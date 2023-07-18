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

// アップロードフォームのイベントリスナーを設定
document.getElementById('uploadForm').addEventListener('submit', function(event) {
	event.preventDefault(); // デフォルトのフォーム送信を防止
  
	// 入力値を取得
	var imageInput = document.getElementById('imageInput');
	var locationInput = document.getElementById('locationInput');
  
	// フォームデータを作成
	var formData = new FormData();
	formData.append('image', imageInput.files[0]);
	formData.append('location', locationInput.value);
  
	// ここで写真のログや位置情報を記録する処理を追加する
  
	// アップロードが完了した後の処理を記述する場合は、以下のコードを使用
	// フォーム送信先のURLを指定
	// var url = 'upload.php';
	// var request = new XMLHttpRequest();
	// request.open('POST', url, true);
	// request.onload = function() {
	//   if (request.status === 200) {
	//     // アップロード成功時の処理
	//   } else {
	//     // アップロード失敗時の処理
	//   }
	// };
	// request.send(formData);
  });
  
  // ユーザーが画像を選択した際にプレビューを表示
  document.getElementById('imageInput').addEventListener('change', function() {
	var file = this.files[0];
	var reader = new FileReader();
  
	reader.onload = function(e) {
	  var imageContainer = document.getElementById('imageContainer');
	  var img = document.createElement('img');
	  img.src = e.target.result;
	  imageContainer.innerHTML = '';
	  imageContainer.appendChild(img);
	};
  
	reader.readAsDataURL(file);
  });
  
