import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private configService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_KEY")
        });
    }

    async validate(payload: any) {
        return {
            userId: payload.id,
            name: payload.name,
            email: payload.email,
        }
    }
}