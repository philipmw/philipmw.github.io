---
layout: post
title:  Cloud backup comparison
date:   2017-01-14 19:00:00
---
I've been using [CrashPlan](http://www.crashplan.com) for over a year now.
I trusted CrashPlan enough to forego a physical backup when I was reinstalled Windows---for a while, there was _no_ copy of my data physically available to me.
CrashPlan had the only copy.
And, like a champ, CrashPlan gave me my data back just as advertised.
I couldn't be happier with their service!
And at $59/year, I consider it a very good value for the peace of mind.

CrashPlan is in the same category of services as [BackBlaze](http://www.backblaze.com), [Carbonite](http://www.carbonite.com), and [Mozy](http://www.mozy.com): managed backups.
The value prop is a flat, single price for unlimited data and free polished apps for various platforms.

But I work at [Amazon Web Services](http://aws.amazon.com), the premier provider of cheap storage.
AWS is one of several providers of Infrastructure-as-a-Service (IaaS), and storage is just one of many building blocks they provide.
If I am willing to get my hands dirty with basic cloud infrastructure, I should be able to save money, right?

First, since AWS provides infrastructure as a service, it's entirely conceivable that CrashPlan is using S3 behind the scenes, with their value-add being a friendly user experience for maintaining data backups.
[SmugMug](http://www.smugmug.com), the photo sharing business, works similarly: they [use S3 as the underlying commodity storage](https://aws.amazon.com/blogs/aws/amazon_s3_and_s/), add paid photo sharing on top of that, and charge a flat subscription fee for unlimited photos.
Common sense says that as you walk down the value chain, you reduce costs.
If CrashPlan uses S3, then me using S3 directly should lead to savings.

Second, if CrashPlan supports backing up and restoring _unlimited amounts_ of data, their fixed price must be high enough to accommodate customers who store much more data than I do.

I did the math.

Yes, using a commodity storage provider can be cheaper---but not always!
The more data you store, or the more frequently you have to restore it, the more attractively priced CrashPlan is.

I created a table comparing costs between CrashPlan and IaaS providers.
The table has two columns for each category: the cost of storage, and the cost of restoring your entire backup.
The cost of storage is monthly, whereas restoring your backup is one-time and hopefully rare.

|        | [CrashPlan](http://www.crashplan.com) | ↵ | [Amazon Glacier](https://aws.amazon.com/glacier/) | ↵ | [Amazon S3](https://aws.amazon.com/s3/) Infrequent Access | ↵ | [Google Coldline](https://cloud.google.com/storage/archival/) | ↵ | [Google Nearline](https://cloud.google.com/storage-nearline/) | ↵                  |
| Stored | store/year | full restore event | store/year     | full restore event | store/year                  | full restore event | store/year     | full restore event | store/year       | full restore event |
| -----: | --: | --: | --: | --: | --: | --: | --: | --: |
| 1 GB   | $59 | $0 | $0 | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| 10 GB  | $59 | $0 | $1 | $1 | $2 | $1 | $1 | $2 | $1 | $1 |
| 100 GB | $59 | $0 | $5 | $10 | $15 | $9 | $8 | $17 | $12 | $13 |
| 1 TB | $59 | $0 | $54 | $105 | $151 | $90 | $84 | $170 | $120 | $130 |
| 10 TB | $59 | $0 | $540 | $1,050 | $1,512 | $901 | $840 | $1,700 | $1,200 | $1,300 |

If we have less than about 100 GB (or maybe 500 GB, if you're feeling lucky) of data, using any cloud commodity storage is a good deal---even screaming good if you're a data lightweight.

But if you are a data creator or collector, the deal sours as you accumulate data.

The big cost factor is network egress.
For cloud providers, storage and internet connectivity is their entire value proposition; they can't hide or average out these costs.
They charge by the gigabyte for traffic going from them to you.
Only incoming traffic may be free.
*So, backing up is free, but every restore costs money.*

By the time you reach a terabyte of backups (which, when including file versioning, is effectively much less than a terabyte of latest data), only Amazon Glacier is even in the running.
With Glacier, you'd be pulling ahead as long as you never lose any data!
Restoring your data one time costs as much as two years of storage.

I can conclude that:

1. CrashPlan must have a lot of _data lightweights_, subscribers who have little data.  (You don't need a lot of data for it to be important!)  Those customers subsidize the data hogs.
2. For a company, in some cases it's cheaper to run their own data center than to outsource infrastructure to a public cloud like AWS.

Now let's turn from IaaS to providers of cloud storage to regular people, such as OneDrive and Dropbox.
These services are not designed for backups, but rather act as an online folder that synchronizes files you put there.
Also, because they're aimed at end-users rather than system administrators and developers, they tend to charge only a flat cost for a tier of data storage.
To make these services support backups, we need to add backup software such as [Arq Backup](http://www.arqbackup.com) for $50 one-time.

Here, the table is simpler, because unlimited data traffic is included in all services of this type, so all restores are free and thus omitted.
The costs here are annual.

| Stored | [CrashPlan](http://www.crashplan.com) | [OneDrive](http://www.onedrive.com) | [Dropbox](http://www.dropbox.com) | [Google Drive](http://google.com/drive) | [Amazon Drive](https://www.amazon.com/clouddrive/home) |
| -----: | --: | --: | --: | --: | --: |
| 1 GB   | $59 | $0 (up to 5 GB) | $0 | $0 | $60 |
| 10 GB  | $59 | $24 (up to 50 GB) | $99 | $0 | $60 |
| 100 GB | $59 | $70 | $99 | $24 | $60 |
| 1 TB   | $59 | $70 | $99 | $120 | $60 |
| 10 TB  | $59 | n/a | n/a | $1,200 | $60 |

Here, it's a closer call.
Again, we have the pattern that as you store more data, some services either becomes prohibitively expensive or simply don't support a customer of your stature.
Eventually, only CrashPlan and Amazon Drive are left.
Except CrashPlan and Amazon Drive.

In summary, if you don't have much data, use a service that charges by storage tiers.
If you have a lot of data, use pay the annual flat fee and go crazy with CrashPlan or Amazon Drive.

Lastly, using your own hardware locally, such as a high-capacity, magnetic hard drive, is much cheaper than any of these cloud backup options.
But that has its own risks, such as dying the way of all hardware, being stolen, or burning in a fire.
Always have a cloud copy of your most important data.

For me, the most interesting learning is that with cloud backups, doing-it-yourself can cost a lot more than just paying a professional.

Thanks for your attention.
Hug your backups tonight.

------

Now, if you care about how I came up with the _CrashPlan vs. IaaS_ table, the methodology follows.

I made two assumptions:

1. It takes 100 AWS API requests to transfer a gigabyte of data.  In other words, the mean filesize is 10 MB.
2. There's an annual data churn of 10%.  So if you're storing an average of 100 GB of data over a year, you added and deleted a combined total of 10 GB of data.

Then used this pricing information:

* AWS Glacier: US West region, $0.004/GB for storage, $0.05 per 1,000 API requests, $0.01/GB for standard retrieval, $0.09/GB for network egress with 1 GB/month free
* AWS S3 IA: US West region, $0.0125/GB for storage, $0.01 per 1,000 PUT requests, $0.001 per 1,000 GET requests, $0.09/GB for network egress with 1 GB/month free
* Google Coldline: general pricing, $0.007/GB for storage, $0.05/GB for retrieval, $0.12/GB for network egress
* Google Nearline: general region, $0.01/GB for storage, $0.01/GB for retrieval, $0.12/GB for network egress

------

Last note: These are my own thoughts and opinions, certainly not my employer's.
I am getting no compensation from any company for writing this comparison.
I wish I was.
