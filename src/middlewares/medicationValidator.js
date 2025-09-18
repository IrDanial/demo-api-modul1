export const validateMedication = (req, res, next) => {
  const { quantity, price } = req.body;

  if (quantity !== undefined) {
    if (typeof quantity !== 'number' || quantity < 0) {
      return res.status(400).json({ 
        error: "Validation failed",
        details: "Field 'quantity' must be a number and cannot be less than 0." 
      });
    }
  }

  if (price !== undefined) {
    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ 
        error: "Validation failed",
        details: "Field 'price' must be a number and cannot be less than 0." 
      });
    }
  }

  next();
};