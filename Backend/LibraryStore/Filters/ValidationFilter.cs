using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using LibraryStore.Validators;

namespace LibraryStore.Filters
{
    public class ValidationFilter : IAsyncActionFilter
    {
        private readonly IServiceProvider _provider;

        public ValidationFilter(IServiceProvider provider) => _provider = provider;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var errors = new List<string>();

            foreach (var arg in context.ActionArguments)
            {
                var value = arg.Value;
                if (value == null) continue;

                var validatorType = typeof(IValidator<>).MakeGenericType(value.GetType());
                var validator = _provider.GetService(validatorType);
                if (validator == null) continue;

                var validateMethod = validatorType.GetMethod("Validate")!;
                var result = validateMethod.Invoke(validator, new[] { value })!;
                var isValid = (bool)result.GetType().GetProperty("IsValid")!.GetValue(result)!;
                var errs = (IEnumerable<string>)result.GetType().GetProperty("Errors")!.GetValue(result)!;

                if (!isValid) errors.AddRange(errs);
            }

            if (errors.Any())
            {
                context.Result = new BadRequestObjectResult(new { Errors = errors });
                return;
            }

            await next();
        }
    }
}