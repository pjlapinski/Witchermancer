using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Witchermancer.Models.Characters;
using Witchermancer.Services;
using Witchermancer.Utility;

namespace Witchermancer.Routing.RouteDefinitions;

public class CharacterRoutes : IRoutesDefinition
{
    public void RegisterEndpoints(WebApplication app)
    {
        app.MapGet("/api/char/{id:length(24)}", GetCharacter);
        app.MapGet("/api/char/list", GetUserCharacters);
        app.MapPost("/api/char/new", CreateCharacter);
        app.MapPost("/api/char/{id:length(24)}", UpdateCharacter);
        app.MapDelete("/api/char/{id:length(24)}", DeleteCharacter);
    }

    [Authorize]
    private static async Task<IResult> GetCharacter(HttpContext ctx, CharactersService service, [FromRoute] string id, ILogger<CharacterRoutes> logger)
    {
        var character = await service.GetByIdAsync(id);
        if (character is null)
        {
            logger.LogInformation("[GetCharacter] Id: {} - 404", id);
            return Results.NotFound();
        }
        character.Id = null;
        var userEmail = ctx.User.GetEmail();
        if (character.OwnerEmail != userEmail)
        {
            logger.LogInformation("[GetCharacter] Id: {}, Owner: {}, Requester: {} - 401", id, character.OwnerEmail, userEmail);
            return Results.Unauthorized();
        }
        logger.LogInformation("[GetCharacter] Id: {} - 200", id);
        return Results.Ok(character);
    }

    [Authorize]
    private static async Task<IResult> GetUserCharacters(HttpContext ctx, CharactersService service, ILogger<CharacterRoutes> logger)
    {
        var userEmail = ctx.User.GetEmail();
        var characters = await service.GetByEmailAsync(userEmail);
        characters.ForEach(ch => ch.Id = null);
        logger.LogInformation("[GetUserCharacters] Owner: {} - 200", userEmail);
        return Results.Ok(characters);
    }

    [Authorize]
    private static async Task<IResult> CreateCharacter(HttpContext ctx, CharactersService service, [FromBody] Character character, ILogger<CharacterRoutes> logger)
    {
        character.OwnerEmail = ctx.User.GetEmail();
        var ch = await service.CreateAsync(character);
        ch.Id = null;
        logger.LogInformation("[CreateCharacter] Owner: {}, Id: {} - 200", ch.OwnerEmail, ch.IdString);
        return Results.Ok(ch);
    }

    [Authorize]
    private static async Task<IResult> UpdateCharacter(HttpContext ctx, CharactersService service, [FromRoute] string id, [FromBody] Character character, ILogger<CharacterRoutes> logger)
    {
        var existingChar = await service.GetByIdAsync(id);
        if (existingChar is null)
        {
            logger.LogInformation("[UpdateCharacter] Id: {} - 404", id);
            return Results.NotFound();
        }
        var userEmail = ctx.User.GetEmail();
        if (existingChar.OwnerEmail != userEmail)
        {
            logger.LogInformation("[UpdateCharacter] Id: {}, Owner: {}, Requester: {}  - 401", id, character.OwnerEmail, userEmail);
            return Results.Unauthorized();
        }
        character.Id = existingChar.Id;
        character.IdString = id;
        await service.UpdateAsync(character);
        logger.LogInformation("[UpdateCharacter] Id: {} - 200", id);
        return Results.Ok();
    }

    [Authorize]
    private static async Task<IResult> DeleteCharacter(HttpContext ctx, CharactersService service, [FromRoute] string id, ILogger<CharacterRoutes> logger)
    {
        var character = await service.GetByIdAsync(id);
        if (character is null)
        {
            logger.LogInformation("[DeleteCharacter] Id: {} - 404", id);
            return Results.NotFound();
        }
        var userEmail = ctx.User.GetEmail();
        if (character.OwnerEmail != userEmail)
        {
            logger.LogInformation("[DeleteCharacter] Id: {}, Owner: {}, Requester: {} - 401", id, character.OwnerEmail, userEmail);
            return Results.Unauthorized();
        }
        await service.DeleteAsync(id);
        logger.LogInformation("[DeleteCharacter] Id: {} - 200", id);
        return Results.Ok();
    }
}
