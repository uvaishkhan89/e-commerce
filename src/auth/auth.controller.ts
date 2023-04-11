import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/user/entities/user.entity";

@Controller('auth')
export class AuthController {

    constructor(private jwtService: JwtService){}

    @Post('/login')
    @UseGuards(AuthGuard('local'))
    login(@Req() req) {
        const user: User = req.user;
        const payload = {
            userId: user.id,
            name: user.name,
            email: user.email
        };
        return {token: this.jwtService.sign(payload)};
    }
}