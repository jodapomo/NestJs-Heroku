import { ApiModelProperty } from "@nestjs/swagger";
import { Schema } from "mongoose";

export class CreateUserDto {

    @ApiModelProperty()
    readonly username: string;
    
    @ApiModelProperty()
    readonly name: string;

    @ApiModelProperty({ type: Schema.Types.ObjectId, isArray: true })
    readonly notes: Schema.Types.ObjectId[];
}