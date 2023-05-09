using System.Security.Claims;

namespace Witchermancer.Utility;

public static class ClaimsPrincipalExtensions
{
    public static string GetEmail(this ClaimsPrincipal user) =>
        user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value ?? "";
}
