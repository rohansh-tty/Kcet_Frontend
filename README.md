# KCET Cutoff Analyzer


### Context:
The Karnataka Common Entrance Test (KCET) is an annual entrance exam conducted by the Karnataka Examination Authority (KEA) for admission into various undergraduate courses in engineering, architecture, pharmacy, agriculture, and other allied courses offered by colleges in the state of Karnataka.

## Pain Point

 The default cutoff list from KEA is huge and confusing. Creating a custom table for specific filters would help in the Application process. I had this pain point while I was applying and recently when my brother was.

The idea here is to act like a filter and get consistent data. But the major setback is parsing the damn cutoff PDF, which is extremely tight, has less padding, and in weird table format.
![KCET Cutoff List](https://drive.google.com/uc?id=1UWW6upHLX_mhWY3LRCYsxu0fQ3x8_ki_)

## Tech Stack

I wanted to keep tech-stack simple, as I wanted to focus more on improving PDF table parsing. I have used Vercel and DigitalOcean for my deployments

- **Frontend**: Vite, React, Tailwind, Primereact and React Router
- **Backend**: Python, Frappe, Redis, MariaDB

## Solution

Now I started with tabula-py, but it missed a lot of rows. For starters, it had issues where for a single row that has 20 columns, 4 columns data will be in 1 row, then some x columns data will be in 2 rows, and so on. No pattern, pure randomness. Tried writing a logic for it, but also explored other alternatives simultaneously. 

![Single Cell Value Aggregation problem](https://drive.google.com/uc?id=1NQh2PpMGDsVS1YS-OuwFWzpQHajCVD7b)
![More such problems](https://drive.google.com/uc?id=1xwZqn3xA10RTZO7yppec49gctTHzsfjo)


The second approach was using OCR, the output was decent but required some cleanup. But it in some way resolved the value aggregation issue. So the idea was to use OCR and convert PDF tables to CSV sheets. 

But there’s one more problem, if you don’t scale down the table(in Google Sheets) and export, you’ll have value aggregation again, which seems like a nightmare to solve. So I scaled it down to 70-80% and then exported it in A3 Landscape sheet format with custom page breakups.

Now using this CSV sheet, I was able to populate my DB. There are issues still with consistency, looking for other alternatives. But this has to go with MVP.  I want something to be live and get critical feedback on my work. Don’t wanna waste time figuring out an optimized approach and then release. I thought if I could set up the pipeline, I would be able to improve data quality later on.  

And I did the same, after 2 months of effort, the app is in the MVP stage. So I have planned to deploy it. I plan to improve things, like exporting the cutoff sheet as CSV and exposing CRUD APIs to allow development on top of existing KCET Cutoff Data. 

## Result
![Result Comparision](https://drive.google.com/uc?id=1h0-32-puEMvoHEZzlTvk-PxU2-HcXZUJ)
The output columns need to be verbose, which I am improving.

## Note:

Right now, it is not open for open-source development. As I have to update the development backend for debug/test. I am planning to add that once the project gets some traction or users.
