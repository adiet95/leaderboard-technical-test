import { Injectable } from '@nestjs/common';
import { appDataSource } from 'src/main';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({async: true})
@Injectable()
export class UniqueValidator implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments){
        let find = { [args.constraints[1]] : args.value}
        let check = await appDataSource.getRepository(args.constraints[0]).findOne({where: find})
        if(check) return true
        return false
    }
    defaultMessage(validationArguments?: ValidationArguments): string {
        return validationArguments.property+ ' ' + validationArguments.value + ' not found'
    }
}

export function IsExist(option:any,validationOption?:ValidationOptions){
    return function (object:any, propertyName:string){
        registerDecorator({
            name : 'IsExist',
            target : object.constructor,
            propertyName : propertyName,
            constraints : option,
            options : validationOption,
            validator : UniqueValidator,
            async : true
        })
    }
}