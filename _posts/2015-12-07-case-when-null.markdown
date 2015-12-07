---
layout: post
title:  Oracle's CASE WHEN NULL
date:   2015-12-07 10:44:44
---
I ran into a problem today.
The solution was not obvious, so I thought I'd blog about it, if only to grease the blog's rusty gears.

I write and maintain a lot of SQL for my team's data pipeline.
For my latest endeavor I wrote SQL similar to this:

```
select t1.interest,
       t1.item,
       (case t2.badge when null then 0 else 1 end) is_badged
from t1
left outer join t2 using (interest, item)
```

My SQL syntax-checked, but the results were odd: every row was `is_badged`.

Turns out, the correct syntax for `is_badged`---for case statements checking for null---is `(case when t2.badge is null then 0 else 1 end)`.
This is a dangerous category of problems where the wrong syntax just silently does the wrong thing.

Ok, so I solved this because the results looked just wrong enough that I noticed.
The actual problem is that I have no testing tools other than (1) syntax-checking SQL, and (2) eyeballing the results.

The field of software engineering has good and always-improving testing practices.
Someone needs to bring these to the field of business intelligence, and I have ideas for how to improve the landscape.
I'll talk to my manager and see if that's a project (20% time?) I can take on.
