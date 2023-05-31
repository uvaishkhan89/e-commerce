import { Body, Controller, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { ResetPasswordDto } from "src/utils/dtos/reset-password.dto";
import { LoginDto } from "./dto/login.dto";

@Controller('auth')
@ApiTags('Login')
export class AuthController {

    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ){}

    @Post('/login')
    @UseGuards(AuthGuard('local'))
    login(@Req() req, @Body() loginDto: LoginDto) {
        const user: User = req.user;
        const payload = {
            userId: user.id,
            name: user.name,
            email: user.email
        };
        return {
            token: this.jwtService.sign(payload),
            payload
        };
    }

    @Post('reset-password')
    async requestPasswordReset(@Body() dto: ResetPasswordDto) {
        const user = await this.userService.findUserByEmail(dto.email);
        const payload = {
            userId: user.id,
            name: user.name,
            email: user.email
        };
        return {token: this.jwtService.sign(payload)};
    }

    @Post('reset-pass')
    async resetPassword(@Body() dto: ResetPasswordDto) {
        try {
            const payload = this.jwtService.verify(dto.token);
            const user = await this.userService.findOne(payload.userId);
            this.userService.updatePassword(user.id, dto.password);
            return 'Password Reset successfully';
        } 
        catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

}