// Resolvers for quotation routes
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { map } from "rxjs/operators";
import { QuotationService } from "./quotation-service.service";
import { IClientDetails } from "./quotation.interface";

@Injectable({
    providedIn: 'root'
})
export class ClientDetailsResolver implements Resolve<IClientDetails> {
    constructor(private quotationService: QuotationService) { }

    resolve(route: ActivatedRouteSnapshot) {
        const clientNo = route.paramMap.get('clientNo');
        return this.quotationService.getClientDetails(clientNo)
        .pipe(
            map(dets => dets)
        )
    }
}

@Injectable({
    providedIn: 'root'
})
export class GroupOwnerDetailsResolver implements Resolve<IClientDetails> {
    constructor(private quotationService: QuotationService) { }

    resolve(route: ActivatedRouteSnapshot) {
        const clientNo = route.paramMap.get('clientNo');
        return this.quotationService.getClientDetails(clientNo)
        .pipe(
            map(dets => dets)
        )
    }
}

