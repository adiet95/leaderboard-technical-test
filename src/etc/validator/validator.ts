import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { log } from 'console';
import { appDataSource } from 'src/main';

@ValidatorConstraint({async: true})
@Injectable()
export class Validator implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments){
        let find = { [args.constraints[1]] : args.value}
        let check = await appDataSource.getRepository(args.constraints[0]).findOne({where: find})
        if(check) return false
        return true
    }
    defaultMessage(validationArguments?: ValidationArguments): string {
        return validationArguments.property+ ' ' + validationArguments.value + ' already used'
    }
}

export function IsUnique(option:any,validationOption?:ValidationOptions){
    return function (object:any, propertyName:string){
        registerDecorator({
            name : 'IsUnique',
            target : object.constructor,
            propertyName : propertyName,
            constraints : option,
            options : validationOption,
            validator : Validator,
            async : true
        })
    }
}