---
layout: post
title:  Cloud backup comparison
date:   2017-01-14 19:00:00
---
I've been using CrashPlan for over a year now.  I trusted CrashPlan enough to forego a physical backup when I was reinstalled Windows---for a while, there was _no_ copy of my data physically available to me.  CrashPlan had the only copy.  And, like a champ, CrashPlan gave me my data back just as advertised.  I couldn't be happier with their service!  And at $59/year, I consider it a very good value for the peace of mind.

But I work at Amazon Web Services, the premier provider of cheap storage!  If I am willing to get my hands dirty and use commodity cloud storage, I should be able to save money, right?

First, CrashPlan could be using S3 behind the scenes, with their value-add being a friendly user experience for maintaining data backups.  SmugMug, the photo sharing business, works similarly: they [use S3 as the underlying commodity storage](https://aws.amazon.com/blogs/aws/amazon_s3_and_s/), add paid photo sharing on top of that, and charge a flat subscription fee for unlimited photos.  If CrashPlan uses S3, then me using S3 directly should lead to savings.

Second, if CrashPlan supports backing up and restoring _unlimited amounts_ of data, their fixed price must be high enough to accommodate customers who store much more data than I do.

To replace the CrashPlan backup client, I'd use [Arq Backup](https://www.arqbackup.com/), a desktop app that backs up your data to one or more of various cloud providers, treating them as interchangeable, commodity storage.  Arq Backup costs $50 one time.  Beyond that, it'd be just the monthly cost charged by S3.

I did the math.

Yes, using a commodity storage provider can be cheaper---but not always!  The more data you store, or the more frequently you have to restore it, the more attractively priced CrashPlan is.

I created a table comparing costs.  The table has two columns for each category: the cost of storage, and the cost of restoring your entire backup.  The cost of storage is monthly, whereas restoring your backup is one-time and hopefully rare.

|        | CrashPlan  | ↵                  | Amazon Glacier | ↵                 | Amazon S3 Infrequent Access | ↵                 | Google Farline | ↵                  | Google Nearline | ↵                  |
| Stored | store/year | full restore event | store/year     | full restore event | store/year                  | full restore event | store/year     | full restore event | store/year       | full restore event |
| -----: | --: | --: | --: | --: | --: | --: | --: | --: |
| 1 GB   | $59 | $0 | $0 | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| 10 GB  | $59 | $0 | $1 | $1 | $2 | $1 | $1 | $2 | $1 | $1 |
| 100 GB | $59 | $0 | $5 | $10 | $15 | $9 | $8 | $17 | $12 | $13 |
| 1 TB | $59 | $0 | $54 | $105 | $151 | $90 | $84 | $170 | $120 | $130 |
| 10 TB | $59 | $0 | $540 | $1,050 | $1,512 | $901 | $840 | $1,700 | $1,200 | $1,300 |

If we have less than about 100 GB (or maybe 500 GB, if you're feeling lucky) of data, using any cloud commodity storage is a good deal---even screaming good if you're a data lightweight.

But if you are a data creator or collector, the deal sours as you accumulate data.

The big cost factor is network egress.  Cloud providers tend to allow free incoming network traffic, but charge per gigabyte for traffic going from them to you.  In other words, backing up may be free, but every restore costs money.

By the time you reach a terabyte of backups (which, when including file versioning, is effectively much less than a terabyte of latest data), only Amazon Glacier is even in the running.  With Glacier, you'd be pulling ahead as long as you never lose any data!  Restoring your data one time costs as much as two years of storage.  Beyond a terabyte, you better run screaming back to CrashPlan, begging them to take you back.

Counterintuitively, CrashPlan's slick software, experience, and unlimited storage is _cheaper_ than a do-it-yourself backup on commodity cloud storage.  I... don't know what to say.  How do they make money?  The only thing I can make of it, they have many data lightweights.  Storage is cheaper, and they transfer less data.

*In summary, this is a rare time when doing-it-yourself may cost more than paying for a managed service.*

Thanks for your attention.  Hug your backups tonight.

------

Now, if you care about how I came up with the table above, the methodology follows.

I made two assumptions:

1. It takes 100 AWS API requests to transfer a gigabyte of data.  In other words, the mean filesize is 10 MB.
2. There's an annual data churn of 10%.  So if you're storing an average of 100 GB of data over a year, you added and deleted a combined total of 10 GB of data.

Then used this pricing information:

* AWS Glacier: US West region, $0.004/GB for storage, $0.05 per 1,000 API requests, $0.01/GB for standard retrieval, $0.09/GB for network egress with 1 GB/month free
* AWS S3 IA: US West region, $0.0125/GB for storage, $0.01 per 1,000 PUT requests, $0.001 per 1,000 GET requests, $0.09/GB for network egress with 1 GB/month free
* Google Farline: general pricing, $0.007/GB for storage, $0.05/GB for retrieval, $0.12/GB for network egress
* Google Nearline: general region, $0.01/GB for storage, $0.01/GB for retrieval, $0.12/GB for network egress
