import type {Endpoint} from "~/api/utils/Endpoint";
import {GetUserEndpoint} from "~/api/modules/users/GetUser/GetUserEndpoint";
import {GetBrandCreatorsEndpoint} from "~/api/modules/brands/GetBrandCreators/GetBrandCreatorsEndpoint";
import {UpdateCreatorEndpoint} from "~/api/modules/creators/UpdateCreator/UpdateCreatorEndpoint";
import {DeleteBrandCreatorEndpoint} from "~/api/modules/brands/DeleteBrandCreator/DeleteBrandCreatorEndpoint";
import {AddAccountEndpoint} from "~/api/modules/accounts/AddAccount/AddAccountEndpoint";
import {DeleteAccountEndpoint} from "~/api/modules/accounts/DeleteAccount/DeleteAccountEndpoint";
import {GetConnectionEndpoint} from "~/api/modules/phyllo/GetConnection/GetConnectionEndpoint";
import {GetCreatorEndpoint} from "~/api/modules/creators/GetCreator/GetCreatorEndpoint";
import {GetSupabaseEndpoint} from "~/api/modules/misc/GetSupabase/GetSupabaseEndpoint";
import {InviteCreatorEndpoint} from "~/api/modules/creators/InviteCreator/InviteCreatorEndpoint";
import {UpdateUserEndpoint} from "~/api/modules/users/UpdateUser/UpdateUserEndpoint";
import {GetBrandEndpoint} from "~/api/modules/brands/GetBrand/GetBrandEndpoint";
import {GetCreatorProfileEndpoint} from "~/api/modules/creator_api/GetCreatorProfile/GetCreatorProfileEndpoint";
import {GetBrandContentEndpoint} from "~/api/modules/creator_api/GetBrandContent/GetBrandContentEndpoint";
import {GetBrandProfilesEndpoint} from "~/api/modules/creator_api/GetBrandProfiles/GetBrandProfilesEndpoint";
import {
    GetBrandCountryDistributionEndpoint
} from "~/api/modules/creator_api/GetBrandCountryDistribution/GetBrandCountryDistributionEndpoint";

export const endpoints: Endpoint[] = [
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
    new GetCreatorProfileEndpoint(),
    new GetBrandContentEndpoint(),
    new GetBrandProfilesEndpoint(),
    new GetBrandCountryDistributionEndpoint(),
];