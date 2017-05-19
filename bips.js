var events = {};
(function(q) {
    var topics = {}, subUid = -1, timeout = 10000;
    
    q.on = function(topic, func) {
        if (!topics[topic]) {
            topics[topic] = [];
        }
        var token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };

    q.emit = function(topic, args, callback) {
        if (!topics[topic]) {
            return false;
        }
        setTimeout(function() {
            var subscribers = topics[topic],
                len = subscribers ? subscribers.length : 0;

            while (len--) {
	            if(callback){ 
		            
		          //  Creates an unique topic name
			      var UID = String(performance.now())+Math.random().toString(36).substr(2, 10);
			      
			      // Deletes the topic if no reply from the subscriber (timout can be set above)
			      setTimeout(function(){delete topics[UID];},timeout);
			      
			      // Creates a listener to fire the silent emit
			      bips.on(UID, function(){
				      // new callback function wrapping the provided callback after removing the topic
				      delete topics[UID];
				      callback.apply(this,arguments)
				  });
			      var c = function(d){bips.emit(UID,d)}
			      subscribers[len].func(args, c);            
			    }else{
                	subscribers[len].func(args);
	            }
            }
        }, 0);
        return true;

    };

    q.off = function(token) {
        for (var m in topics) {
            if (topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return false;
    };
}(events));