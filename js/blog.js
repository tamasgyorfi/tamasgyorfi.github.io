	var firebaseConfig = {
		apiKey: "AIzaSyAa4hKr2lJj_81SYxsBYTScfdszBJXYuto",
		authDomain: "blogserver-tamasgyorfi.firebaseapp.com",
		databaseURL: "https://blogserver-tamasgyorfi.firebaseio.com",
		projectId: "blogserver-tamasgyorfi",
		storageBucket: "blogserver-tamasgyorfi.appspot.com",
		messagingSenderId: "46995779231",
		appId: "1:46995779231:web:2faea230a3df1736317caa",
		measurementId: "G-S6PLM1SL06"
	};

	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


	function addCategories(parent, d) {
		if (d.categories) {
		  		d.categories.split(",").map(s=>{

		  			var elem = document.createElement("div");
		  			elem.className = "d-inline p-3 mr-1 bg-dark text-white";
		  			elem.innerHTML = s;

		  			document.getElementById(parent).appendChild(elem);
		  		});
		  	}
	}

		function showEntry(d) {
		  	var titleElement = document.createElement('h1');
		  	titleElement.innerHTML = d.title.toUpperCase();

		  	var publishedElement = document.createElement('p');
		  	publishedElement.innerHTML = `<bold>Published on: </bold><i>${d.date.toLocaleDateString('en-EN', options)}</i>`;

		  	var headlineElement = document.createElement('p');
		  	headlineElement.innerHTML = `<b>${d.headline}</b>`;

		  	var bodyElement = document.createElement('p');
		  	bodyElement.innerHTML = d.body;

		  	document.getElementById("postTitle").appendChild(titleElement);
		  	document.getElementById("postPublished").appendChild(publishedElement);
		  	document.getElementById("postHeadline").appendChild(headlineElement);
		  	document.getElementById("postBody").appendChild(bodyElement);

		  	addCategories("postCategories", d);
		}

		  function clearPreviousEntries() {
		  	document.getElementById("postTitle").innerHTML = "";
		  	document.getElementById("postPublished").innerHTML = "";
		  	document.getElementById("postHeadline").innerHTML = "";
		  	document.getElementById("postBody").innerHTML = "";
		  	document.getElementById("postCategories").innerHTML = "<p>Categories:</p>";
		  }

		  function readerpaneOn(d) {
		  	clearPreviousEntries();
		  	showEntry(d);

		  	$('#modalQuickView').modal('show')
		  }

		  function openNewTab(d) {
		  	window.open("story?id="+d.id);
		  }

		  function createPostDiv(doc, index) {
		  	var newElement = document.createElement('div');
    		newElement.id = doc.title;

    		var innerHTMLTemplate = `
    			<div class="container" id="blog">
                	<div class="row" >
                  		<div class="col-md-3" >
                    		<img src="${doc.headlineImg}" width="200" height="200" />
                  		</div>
                  		<div class="col-md-7">
                  			<p><b>${doc.title}</b></p>
                  			<p><strong>Published on: </strong><i>${doc.date.toLocaleDateString('en-EN', options)}</i></p>
                  			<p>${doc.headline.substring(0, 400)}[...]</p>
                  			<button type="button" class="btn btn-primary" id="btn_q_${index}">
  								Quick view
							</button>
							<button type="button" class="btn btn-primary" id="btn_v_${index}">
  								Read on
							</button>
                  		</div>
                  	</div>
                </div>`;

    		newElement.innerHTML = innerHTMLTemplate;
    		return newElement;
		  }

		  function loadPosts() {
		  	firebase.initializeApp(firebaseConfig);
		  	firebase.analytics();

		  	firebase.firestore().collection('blog-posts').where("published", "==", "true").get()
   							.then(querySnapshot => {
   								var documents = [];
      							querySnapshot.docs.forEach((doc, index) => {
      								documents.push({
      									id: doc.id,
      									title: doc.data().title,
      									body: doc.data().body,
      									categories: doc.data().categories,
      									date: new Date(doc.data().date),
      									headline: doc.data().headline,
      									headlineImg: doc.data().headlineImg,
      									published: doc.data().published
      								});
      							});

      							documents.sort(function(a,b){
 									 return b.date - a.date;
								});

	     						documents.forEach((doc, index) => {
						    		var element = createPostDiv(doc, index);
						   			document.getElementById("aggregator").appendChild(element);
						    								
									document.getElementById(`btn_q_${index}`).onclick = function() {
										readerpaneOn(doc);
									}

						    		document.getElementById(`btn_v_${index}`).onclick = function() {
						    			openNewTab(doc);
									}
					    		});
    						});
    	}

    		function loadPostById(id) {
    			firebase.initializeApp(firebaseConfig);
		  		firebase.analytics();	

		  		const qsnap =  firebase.firestore()
    									.collection('blog-posts')
    									.where(firebase.firestore.FieldPath.documentId(), "==", id)
    									.where("published", "==", "true")
    									.get();

		  		return qsnap;
    		}


