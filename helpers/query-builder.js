module.exports = async (queryParams, model, populate) => {
  // Copy query parameters
  let params = { ...queryParams };

  // Extract special fields
  let { select, sort, page, limit } = params;

  // Remove special fields
  let fields = ["select", "sort", "page", "limit"];

  fields.forEach((param) => {
    delete params[param];
  });

  // Add $ to the operators
  let regex = /\b(gt|gte|lt|lte|in)\b/g;

  let queryString = JSON.stringify(params).replace(
    regex,
    (match) => `$${match}`
  );

  // Instantiate query
  let query = model.find(JSON.parse(queryString));

  // Select Fields
  query = select ? query.select(format(select)) : query;

  // Sort Fields
  query = sort ? query.sort(format(sort)) : query.sort("-createdAt");

  //Pagination
  page = page ? parseInt(page, 10) : 1;
  limit = limit ? parseInt(limit, 10) : 100;

  let start = (page - 1) * limit;
  let end = page * limit;
  let total = await model.countDocuments();

  query = query.skip(start).limit(limit);

  // Populate result
  query = populate ? query.populate(populate) : query;

  // Execute Query
  let results = await query;

  let pagination = {};

  pagination.next =
    end >= total
      ? null
      : {
          page: page + 1,
          limit: limit,
        };

  pagination.previous =
    start == 0
      ? null
      : {
          page: page - 1,
          limit: limit,
        };

  return {
    success: true,
    count: results.length,
    pagination: pagination,
    data: results,
  };
};

const format = (str) => {
  return str.split(",").join(" ");
};
