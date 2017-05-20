<!--
  Title: Javascript bidirectional pub/sub pattern
  Description: Pub/sub is a very effective javascript pattern which can be improved adding bidirectionality.
  Author: Frédéric Rufin
  -->
# js-bidirectional-pubsub

Pub/sub is a very effective javascript pattern in order to avoid direct interaction between code modules. However its one way mode may require additional hard-coded pub/sub if you expect some reply…
I suggest improving javascript pub/sub pattern in order to provide bidirectionality.

## Under the hood

This implementation creates a temporary, silent reverse topic in order to avoid hard-coding a new pub/sub couple.
You can find details here:
http://medway.fr/blog/index.php/2017/05/12/adding-bidirectional-to-js-pubsub/

## Syntax

The "events" object functions names are similar to those found in any standard pub/sub implementation.

### pubish(topic, data [,callback])

Publishes with an optional callback function as a third argument.
If such a callback exists, if will handle a potential response:
```
events.publish("myTopic", data){
	// some code handling response...
});
```
If not, the pub/sub pattern will work as usual...
```
events.publish("myTopic", data);
```

### submit(topic, callback)

The submitter can "reply" in case the publisher provided a callback function:

```
var mySubmit = events.submit("myTopic", function(data, reply){
  // Some code generating a response...
  reply(response);
 });
```
If not, the pub/sub pattern will work as usual...
```
events.submit("myTopic", function(data){
    ...
};
```
### unsubmit()

Removes the callback:

```
mySubmit.unsubmit();

```
## Caveats

If a callback function is provided when publishing, you should consider it only as a one-to-one communication,
because in case of several subscribers, you may have to manage several responses...



## Acknowledgments

* We started from Andy Osmany pub/sub vanilla JS implementation
