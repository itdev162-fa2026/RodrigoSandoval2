using System.ComponentModel.DataAnnotations;

namespace Domain.Validation;

public class ValidSalePriceAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        var product = validationContext.ObjectInstance as Product;
        
        // If we can't cast to Product, validation passes (let other validators handle it)
        if (product == null)
        {
            return ValidationResult.Success;
        }

        if (product.IsOnSale)
        {
            if (product.SalePrice == null)
            {
                return new ValidationResult("Sale price is required when product is on sale");
            }

            if (product.SalePrice >= product.Price)
            {
                return new ValidationResult("Sale price must be less than regular price");
            }
        }

        return ValidationResult.Success;
    }
}