import sanitizeHtml from 'sanitize-html';

const sanitizeRequest = (value) => {
  const sanitizedValue = sanitizeHtml(value, {
    allowedTags: [],
    allowedSchemes: [],
  });
  console.log(sanitizedValue);
  return sanitizedValue.trim();
};

export default sanitizeRequest;
