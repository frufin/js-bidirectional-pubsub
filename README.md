# js-bidirectional-pubsub

Pub/sub is a very effective javascript pattern in order to avoid direct interaction between code modules. However its one way mode may require additional hard-coded pub/sub if you expect some reply…
I suggest improving javascript pub/sub pattern in order to provide bidirectionality.

## Under the hood

This implementation creates a temporary, silent reverse topic in order to avoid hard-coding a new pub/sub couple.
You can find details here:
http://medway.fr/blog/index.php/2017/05/12/adding-bidirectional-to-js-pubsub/

## Syntax
Events functions are emit(), on() and off() instead of publish, subscribe and unsubscribe.


### emit(topic, data [,callback])

Publishes  with an optional callback function as a third argument.
If a callback function is provided, if will handle a potential response:
```
events.emit("myTopic", data){
	// some code handling response...
});
```
If not, the pub/sub pattern will work as usual...
```
events.emit("myTopic", data);
```

### on()

The submitter can "reply" in case the publisher provided a callback function:

```
var mySubmit = events.on("myTopic", function(data, reply){
  // Some code generating a response...
  reply(response);
 });
```
If not, the pub/sub pattern will work as usual...
```
events.on("myTopic", function(data){
    ...
};
```
### off()

Removes the callback:

```
mySubmit.off();
```



## Acknowledgments

* We started from Andy Osmany pub/sub vanilla JS implementation
