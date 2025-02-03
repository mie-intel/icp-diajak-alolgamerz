import {useRouter} from "next/navigation"

export function useNavigation() {
    const router = useRouter();
  
    const goToContractDetails = (data) => {
      localStorage.setItem("curContract", data);
      router.push("/dashboard/contracts/contract-detail");
    };
  
    const goToMeetDetails = (data) => {
      localStorage.setItem("curMeet", data);
      router.push("/dashboard/contracts/meet-detail");
    };
  
    return { goToContractDetails, goToMeetDetails };
  }