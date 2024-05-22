
  const  descriptions  = await Description.findAndCountAll();
  let per_page;
  if (count < 10){
     per_page = count
  }
  if (count > 9){
     per_page = 10
  }
  if (page) {
    descriptions = descriptions.slice((10 * page) - 10, 10 * page)
 }
  const page = parseInt(req.query.page) || 1;
  const from = (page - 1) * per_page;
  const to = page * per_page
  const total_pages = Math.ceil(count / per_page);
console.log(descriptions)
  return res.status(200).json({ 
    Message: 'Records found',
    count: count, 
    page: page,
    per_page: per_page,
    total_records: count,
    total_pages: total_pages,
    showing_from: from + 1,
    to: to, 
    Descriptions: descriptions })
