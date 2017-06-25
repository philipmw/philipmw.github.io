---
layout: post
title:  Latency of Scaleway
date:   2017-06-24 22:05:00
---
I am building a webapp.
Its backend is CPU-intensive, and I am writing it in Erlang since Erlang has great support for safe concurrency.
But for concurrency to speed up your application, the hardware must have multiple cores---otherwise all your beautiful concurrency is fighting over that single CPU core.
Unfortunately, all mainstream cloud providers' cheapest offering has just one CPU core.

Enter [Scaleway](http://www.scaleway.com).  It's a unique cloud provider that offers a lineup of ARMv8 servers, starting at 2.99 euro ($3.35) per month for 4 CPU cores, 2 GB of RAM, and unlimited data transfer at 200 Mbps throughput!
Compared to other cloud providers, that's a lot of hardware and network for a small amount of money!
How much better will your app perform on Scaleway's cloud?

Lots of RAM and massive network throughput are undoubtedly great, and there's not much to say about these features.
You probably already know how much RAM, network bandwidth, and monthly data transfer your app needs.

But what about the four CPU cores?  That's intriguing.

Four cores offer four times more parallelism than price-equivalent offerings from other cloud providers.
This, in turn, suggests that your apps will run faster, and it encourages programming languages like Haskell and Erlang that have a high learning curve but dangle the possibility of massive speed benefits throughs safe and lightweight concurrency.

But your application's performance depends on so much more than CPU parallelism!
For webapps, network latency tends to eclipse any hardware performance differences.

The problem with Scaleway, from my U.S.-oriented perspective, is that its data centers are outside of the U.S.: one is in Paris, and one's in Amsterdam.
That's a long way to travel for extra CPU cores!

*So, how's Scaleway's latency?*
There are no published numbers, so I researched it myself.

## Methodology

I started two servers on Scaleway's cloud: one in Paris, and one in Amsterdam.
Both are of type _ARM64-2GB_: they're the most modest option of the ARMv8 architecture lineup that Scaleway announced just a few days ago.
Both use the Ubuntu Xenial (16.04 latest) image, and are completely stock: I haven't even SSHed into them.

To be thorough in testing latency, I wanted to test in three ways:

1. from my home in Seattle, served by CondoInternet ISP.  This represents the typical user experience, but the test is specific to my residential ISP, wireless router, and computer.
2. from an EC2 instance in [AWS'](http://aws.amazon.com) _us-west-2_ and _us-east-1_ regions.  (It's a `t1.micro` instance with the latest Amazon Linux OS and software updates.)
3. using [MapLatency](http://maplatency.com), a third-party latency-measuring site, to test from their U.S. endpoints.

How I reduced as much interference and jitter as I could:

1. For testing from home, I closed my browser and any other network-using application first, and left my computer alone during the test.
2. For testing from AWS, I redirected `ping`'s output to `/dev/shm`, which is a `tmpfs`, to eliminate both the network traffic to my laptop and writing to any storage device during the ping test.
3. Both from home and from AWS, I ran the standard `ping` command with a count of 100, one ping per second, to get a good average.

## Test Results

This map summarizes the rest of this section:

![Latency map](/assets/2017-06-24%20latencies.png)

### Details

These are the result of the standard `ping` command, run with a count of 100.
Latencies are expressed in this format: `round-trip min / **avg** / max / stddev`.

From ∖ To                   | Scaleway's Amsterdam datacenter          | Scaleway's Paris data center
--------------------------- | ---------------------------------------- | -------------------------------------
my home (CondoInternet ISP) | 158.661 / **159.745** / 164.679 / 0.624 ms | 149.722 / **150.665** / 153.001 / 0.517 ms
AWS us-west-2 (Oregon)      | 167.070 / **167.881** / 173.808 / 1.335 ms | 165.074 / **166.083** / 174.366 / 2.173 ms
AWS us-east-1 (N. Virginia) | 92.921 / **93.349** / 100.997 / 0.874 ms   | 93.430 / **93.969** / 104.279 / 1.626 ms

### MapLatency's results

To Scaleway's Amsterdam datacenter:

* Comcast in California: 165 ms
* GigaMonster in Georgia: 104 ms
* Spectrum in Florida: 131 m
* Verizon in New York: 85 ms

To Scaleway's Paris datacenter:

* Frontier in Washington: 146 ms
* Time Warner in Texas: 125 ms
* Comcast in Illinois: 105 ms
* Fairpoint in New Hampshire: 110 ms

### Latency from my Seattle home to AWS

Recall, what I _really_ care about when choosing my cloud provider is the latency that a regular user will experience.
So, let's compare apples to apples: we have the latency from my home to Scaleway, but what about my home to AWS?

From my home (CondoInternet ISP) to... | Latency
-------------------------------------- | -------------------------------------
AWS us-west-2 (Oregon)                 | 10.141 / **11.396** / 21.420 / 1.723 ms
AWS us-east-1 (N. Virginia)            | 61.404 / **62.763** / 72.916 / 2.102 ms

## Conclusions

If you are building a webapp for a U.S. audience, do them a favor and host it in the U.S.

Scaleway's latency penalty is on the order of 100 milliseconds, compared to AWS.

Scaleway's latency is lower on the east coast compared to the west coast.

*What kinds of U.S.-based customers or applications would benefit from being in Scaleway's cloud?*

* Your app is both CPU-intensive and highly concurrent, and latency does not matter because your customers are not waiting for results in real time.  (As in, not a webapp.)
* You are on a shoestring budget and need more RAM or data transfer than price-equivalent offerings from U.S.-based cloud providers.  Budget is more important to you than your webapp's responsiveness.
* It gives you warm fuzzies to say that your app is highly parallel, latency be damned!
* It gives you warm fuzzies to financially support this unique ARM-based cloud.

