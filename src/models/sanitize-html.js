import sanitizeHtml from 'sanitize-html';

const sanitizeRequest = (value) => {
  const sanitizedString = sanitizeHtml(value, {
    allowedTags: [],
  });
  return sanitizedString.trim();
};

export default sanitizeRequest;
