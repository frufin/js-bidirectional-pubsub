var events = {};
(function(q) {
    var topics = {}, subUid = -1, timeout = 10000;
    
    q.subscribe = function(topic, func) {
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

    q.publish = function(topic, args, publisherCallback) {
        if (!topics[topic]) {
            return false;
        }
        setTimeout(function() {
            var subscribers = topics[topic],
                len = subscribers ? subscribers.length : 0;

            while (len--) {
	            if(publisherCallback) { 
		            
		          //  Creates an unique topic name
			      var UID = uniqueName();
			      
			      // Deletes the topic if no reply from the subscriber (timout can be set above)
			      setTimeout(function(){delete topics[UID];},timeout);
			      
			      // a new, temporary subscription in order to handle a potential response:
			      q.subscribe(UID, function(){
				      // new callback function wrapping the provided callback plus the topic removal
				      delete topics[UID];
				      publisherCallback.apply(this,arguments)
				  });
				  // another callback function that the initial subscriber will be able to use to provide such a response
			      var reply = function(d){q.publish(UID,d)}
			      
			      subscribers[len].func(args, reply);            
			    }
			    else {
                	subscribers[len].func(args);
	            }
            }
        }, 0);
        return true;

    };

    q.unsubscribe = function(token) {
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
    
    var uniqueName = function(){
	    
	    // You can replace this by any other method returning an unique identifier...
	    return String(performance.now())+Math.random().toString(36).substr(2, 10);
	    
    }
}(events));
