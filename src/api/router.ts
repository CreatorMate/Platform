import type {Endpoint} from "~/src/api/utils/Endpoint";
import {GetUserEndpoint} from "~/src/api/modules/users/GetUser/GetUserEndpoint";
import {GetBrandCreatorsEndpoint} from "~/src/api/modules/brands/GetBrandCreators/GetBrandCreatorsEndpoint";
import {UpdateCreatorEndpoint} from "~/src/api/modules/creators/UpdateCreator/UpdateCreatorEndpoint";
import {DeleteBrandCreatorEndpoint} from "~/src/api/modules/brands/DeleteBrandCreator/DeleteBrandCreatorEndpoint";
import {AddAccountEndpoint} from "~/src/api/modules/accounts/AddAccount/AddAccountEndpoint";
import {DeleteAccountEndpoint} from "~/src/api/modules/accounts/DeleteAccount/DeleteAccountEndpoint";
import {GetConnectionEndpoint} from "~/src/api/modules/phyllo/GetConnection/GetConnectionEndpoint";
import {GetCreatorEndpoint} from "~/src/api/modules/creators/GetCreator/GetCreatorEndpoint";
import {GetSupabaseEndpoint} from "~/src/api/modules/misc/GetSupabase/GetSupabaseEndpoint";
import {InviteCreatorEndpoint} from "~/src/api/modules/creators/InviteCreator/InviteCreatorEndpoint";
import {UpdateUserEndpoint} from "~/src/api/modules/users/UpdateUser/UpdateUserEndpoint";
import {GetBrandEndpoint} from "~/src/api/modules/brands/GetBrand/GetBrandEndpoint";
// import {GetCreatorProfileEndpoint} from "~/src/api/modules/creator_api/GetCreatorProfile/GetCreatorProfileEndpoint";
// import {GetBrandContentEndpoint} from "~/src/api/modules/creator_api/GetBrandContent/GetBrandContentEndpoint";
// import {GetBrandProfilesEndpoint} from "~/src/api/modules/creator_api/GetBrandProfiles/GetBrandProfilesEndpoint";
// import {
//     GetBrandCountryDistributionEndpoint
// } from "~/src/api/modules/creator_api/GetBrandCountryDistribution/GetBrandCountryDistributionEndpoint";
import type {BaseController} from "~/src/api/utils/BaseController";
// import {StatisticsController} from "~/src/api/modules/creator_api/statistics/StatisticsController";
import type {Hono} from "hono";
import {GetCreatorBrandsEndpoint} from "~/src/api/modules/creators/GetCreatorBrands/GetCreatorBrandsEndpoint";
import {UpdateCreatorBrandsEndpoint} from "~/src/api/modules/creators/UpdateCreatorBrands/UpdateCreatorBrandsEndpoint";
import {CoreController} from "~/src/api/modules/creator_api/Core/CoreController";
import {ProjectsController} from "~/src/api/modules/projects/ProjectsController";
import {MetricController} from "~/src/api/modules/projects/MetricController";
import {WidgetsController} from "~/src/api/modules/projects/WidgetsController";
import {BrandController} from "~/src/api/modules/brands/BrandController";

export function initializeHonoRouter(app: Hono) {
    const controllers: BaseController[] = [
        // new StatisticsController(app),
        new CoreController(app),
        new ProjectsController(app),
        new MetricController(app),
        new WidgetsController(app),
        new BrandController(app),
    ];

    const endpoints: Endpoint[] = [
        new GetUserEndpoint(),
        new GetBrandCreatorsEndpoint(),
        new UpdateCreatorEndpoint(),
        new DeleteBrandCreatorEndpoint(),
        new AddAccountEndpoint(),
        new DeleteAccountEndpoint(),
        new GetConnectionEndpoint(),
        new GetCreatorEndpoint(),
        new GetSupabaseEndpoint(),
        new InviteCreatorEndpoint(),
        new UpdateUserEndpoint(),
        new GetBrandEndpoint(),
        // new GetCreatorProfileEndpoint(),
        // new GetBrandContentEndpoint(),
        // new GetBrandProfilesEndpoint(),
        // new GetBrandCountryDistributionEndpoint(),
        new GetCreatorBrandsEndpoint(),
        new UpdateCreatorBrandsEndpoint()
    ];

    for(const controller of controllers) {
        controller.endpoints();
    }

    for(const endpoint of endpoints) {
        endpoint.register(app);
    }
}

