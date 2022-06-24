import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allRequiredDoctorInfor: [],
    allClinics: [],
    allSpecialties: [],
    allBookings: [],
    allDetailClinicById: [],
    
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = {...state}
            copyState.isLoadingGender = true;
            return {
                ...copyState,
                
            }
        
        case actionTypes.FETCH_GENDER_SUCCESS:
           
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
              
            }

        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
                
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
    
            state.positions = action.data;
            return {
                ...state,
            
            }

        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state,
                
            }   

            case actionTypes.FETCH_ROLE_SUCCESS:
    
                state.roles = action.data;
                return {
                    ...state,
                
                }
    
            case actionTypes.FETCH_ROLE_FAILED:
                state.roles = [];
                return {
                    ...state,
                    
                }  
                
            case actionTypes.FETCH_ALL_USERS_SUCCESS:
                state.users = action.users;
                return {
                    ...state,
                }

                case actionTypes.FETCH_ALL_USERS_FAILED:
                state.users = [];
                return {
                    ...state,
                }

                case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
                    state.topDoctors = action.dataDoctors;
                    return {
                        ...state,
                    }

                    case actionTypes.FETCH_TOP_DOCTORS_FAILED:
                        state.topDoctors = [];
                        return {
                            ...state,
                        }
            
            case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:  
                state.allDoctors = action.dataDoctors;
                return {
                    ...state,
                }

                case actionTypes.FETCH_ALL_DOCTORS_FAILED:
                    state.allDoctors = [];
                    return {
                        ...state,
                    }

            case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:  
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
            }

            case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
                state.allScheduleTime = [];
                return {
                    ...state,
                }


            case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:  
            state.allRequiredDoctorInfor = action.data;

            
            return {
                ...state,
            }

            case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
                state.allRequiredDoctorInfor = [];
                return {
                    ...state,
                }

                case actionTypes.FETCH_ALL_CLINICS_SUCCESS:  
                state.allClinics = action.dataClinics;
                return {
                    ...state,
                }

                case actionTypes.FETCH_ALL_CLINICS_FAILED:
                    state.allClinics = [];
                    return {
                        ...state,
                    }    

                
                    case actionTypes. FETCH_ALL_SPECIALTY_SUCCESS:  
                    state.allSpecialties = action.dataSpecialties;
                    return {
                        ...state,
                    }
    
                    case actionTypes. FETCH_ALL_SPECIALTY_FAILED:
                        state.allSpecialties = [];
                        return {
                            ...state,
                        }        

                 
                        case actionTypes.FETCH_ALL_BOOKING_SUCCESS:  
                        state.allBookings = action.dataBookings;
                        return {
                            ...state,
                        }
        
                        case actionTypes.FETCH_ALL_BOOKING_FAILED:
                            state.allBookings = [];
                            return {
                                ...state,
                            }                  

                            case actionTypes. FETCH_ALL_DETAIL_CLINIC_BY_ID_SUCCESS:  
                            state.allDetailClinicById = action. dataClinicById;
                            return {
                                ...state,
                            }
            
                            case actionTypes.FETCH_ALL_DETAIL_CLINIC_BY_ID_FAILED:
                                state.allDetailClinicById= [];
                                return {
                                    ...state,
                                }                      
        default:
            return state;
    }
}

export default adminReducer;