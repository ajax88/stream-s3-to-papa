# stream-s3-to-papa
Test Project to stream an s3 csv through papa

## Testing

1. Install the packages with npm install 
2. Create an AWS account if necessary
3. Upload the csv, large_users.csv, included in this project to s3 (or some other csv with 100000 rows)
4. Run S3_KEY=your-s3-key S3_BUCKET=your-bucket S3_SECRET=your-secret S3_REGION=your-region CSV_KEY=path-to-csv-in-s3 node index.js
