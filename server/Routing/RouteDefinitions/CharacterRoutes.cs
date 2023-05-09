﻿using Microsoft.AspNetCore.Authorization;
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
    private static async Task<IResult> GetCharacter(HttpContext ctx, CharactersService service, [FromRoute] string id)
    {
        var character = await service.GetByIdAsync(id);
        if (character is null) return Results.NotFound();
        return character.OwnerEmail == ctx.User.GetEmail() ? Results.Ok(character) : Results.Unauthorized();
    }

    [Authorize]
    private static async Task<IResult> GetUserCharacters(HttpContext ctx, CharactersService service) =>
        Results.Ok(await service.GetByEmailAsync(ctx.User.GetEmail()));

    [Authorize]
    private static async Task<IResult> CreateCharacter(
        HttpContext ctx,
        CharactersService service,
        [FromBody] Character character
    )
    {
        character.OwnerEmail = ctx.User.GetEmail();
        return Results.Ok(await service.CreateAsync(character));
    }

    [Authorize]
    private static async Task<IResult> UpdateCharacter(
        HttpContext ctx,
        CharactersService service,
        [FromRoute] string id,
        [FromBody] Character character
    )
    {
        var existingChar = await service.GetByIdAsync(id);
        if (existingChar is null) return Results.NotFound();
        if (existingChar.OwnerEmail != ctx.User.GetEmail()) return Results.Unauthorized();
        character.Id = ObjectId.Parse(id);
        await service.UpdateAsync(character);
        return Results.Ok();
    }

    [Authorize]
    private static async Task<IResult> DeleteCharacter(HttpContext ctx, CharactersService service,
        [FromRoute] string id)
    {
        var character = await service.GetByIdAsync(id);
        if (character is null) return Results.NotFound();
        if (character.OwnerEmail != ctx.User.GetEmail()) return Results.Unauthorized();
        await service.DeleteAsync(id);
        return Results.Ok();
    }
}