import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { useDispatch, useSelector } from 'react-redux';
import { generalSetting, generalSettingUpdate } from '../../../../redux/actions';
import MainLoader from "../../../../components/MainLoader"
import { getBase64 } from '../../../..//helpers/imageToBase64';
import ToastHandle from '../../../../helpers/toastMessage';



const SystemSettingsForm = (props) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const generalSettingData = store.GeneralSetting.generalSettings
    const generalSettingLoader = store.GeneralSetting
    const generalSettingStatus = store?.GeneralSettingUpdate?.status
    const generalSettingMessage = store?.GeneralSettingUpdate?.message
    const generalSettingUpdateLoader = store.GeneralSettingUpdate

    console.log("rerendering ",generalSettingData)


    const [mapGoogle, setMapGoogle] = useState({
        lat: 30.733315,
        lng: 76.779419,
    });


    const imageFormatter = (cell) => {
        return (<img style={{ width: 50 }} src={cell} />)
    }

    // Form Data Get
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();


    const generalSettingForm = () => {
        const data = generalSettingData
        reset({
            name: data.shop_name,
            address1: data.shop_address1,
            address2: data.shop_address2,
            city: data.shop_city,
            state: data.shop_state,
            zipCode: data.shop_zip,
            country: data.country,
            language: data.sys_lang,
            businessMobile: data.shop_phone,
            landline: data.shop_mobile,
            emailId: data.shop_email,
            logo: imageFormatter(data.shop_logo),
            timeZone: data.sys_timezone,
            currency: data.sys_currency,
            showSystem: data.sys_currency_show,
            setCurrencyDecimal: data.no_of_decimal_places,
            allZipCode: data.openpincode,
            templateName: data.template_name,
            mobileTemplate: data.mobile_template,
            orderId: "1",
            off: data.auto_driver_assign,
            challanForm: data.challan_name,
            pickup: data.pickup_requestid_from,
            delivery: data.delivery_requestid_from,
            facebook: data.face_link,
            instagram: data.inst_link,
            twitter: data.twit_link,
            skype: data.skyp_link,
            linkedin: data.linkd_link,
            yelp: data.yelp_link,
            retailOrderForm: "",
            pinterestLink: data.pininterest_link,
            googleMap: data.shop_gmap
        })
    }
    const starRequired = (<span className='text-danger'>*</span>)


    useEffect(() => {
        dispatch(generalSetting())
    }, [])

    useEffect(() => {
        generalSettingForm()
    }, [generalSettingData])


    const curdAction = (data) => {
        dispatch(generalSettingUpdate({
            shopName: data.name,
            shopAddress1: data.address1,
            shopAddress2: data.address2,
            shopCity: data.city,
            shopState: data.state,
            shopZip: data.zipCode,
            shopGmap: data.googleMap,
            shopPhone: data.businessMobile,
            shopMobile: data.landline,
            shopEmail: data.emailId,
            shopLogo: data.logo,
            sysLang: data.language,
            sysCurrency: data.currency,
            sysCurrencyShow: data.showSystem,
            sysTimezone: data.timeZone,
            challanName: data.challanForm,
            pickupRequestidFrom: data.pickup,
            deliveryRequestidFrom: data.delivery,
            autoDriverAssign: data.off,
            countryPhoneCode: "",
            prefixCountryCode: "",
            openpincode: data.allZipCode,
            noOfDecimalPlaces: data.setCurrencyDecimal,
            templateName: data.templateName,
            mobileTemplate: data.mobileTemplate,
            faceLink: data.facebook,
            instLink: data.instagram,
            twitLink: data.twitter,
            skypLink: data.skype,
            linkdLink: data.linkedin,
            yelpLink: data.yelp,
            pininterestLink: data.pinterestLink,
        }))
    }

    const handleGeneralSetting = async (data) => {
        let file = data.logo[0];
        if (file) {
            await getBase64(file)
                .then(result => {
                    data.logo = result
                    curdAction(data)
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            curdAction(data);
        }


    }


    useEffect(() => {
        if (generalSettingStatus) {
            ToastHandle('success', generalSettingMessage);
        } else if (generalSettingStatus === false) {
            ToastHandle('error', generalSettingMessage);
        }

    }, [generalSettingStatus])
    return (
        <>
            {generalSettingUpdateLoader?.loading ? <MainLoader /> : <Card>
                {generalSettingLoader?.loading ? <MainLoader /> : <Card.Body>

                    <Form noValidate onSubmit={
                        handleSubmit((data) => {
                            handleGeneralSetting(data)
                        }, (err) => {
                            console.log(err)
                        })
                    }>
                        <Row className="p-3 py-0">
                            <Col lg={12}>
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_businessname">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Business Name :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('name')}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_address">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Business Address/Apt no :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('address1')}
                                                        placeholder="address1"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>


                                <Row>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_address2">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Business Address2 :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('address2')}
                                                        placeholder="address2"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_city">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Business City :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('city')}
                                                        placeholder="City"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <hr />
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_state">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Business State :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('state')}
                                                        placeholder="State"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_zipcode">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Business Pin Code :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('zipCode')}
                                                        placeholder="zipCode"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_country">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Business Country{starRequired} :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group>
                                                        <Form.Select
                                                            {...register('currency')}
                                                            placeholder="Business Country"
                                                            isInvalid={errors.currency}
                                                        >
                                                            <option hidden value=''>--Select--</option>
                                                            {generalSettingData?.currency?.map((data, index) => {
                                                                return (
                                                                    <>

                                                                        <option value={data.country_name}>{data.country_name}</option>

                                                                    </>

                                                                );
                                                            })}
                                                        </Form.Select>
                                                    </Form.Group>
                                                    {errors.currency && <span className='text-danger'>Please Select your Country</span>}

                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_language">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Choose Language :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group>
                                                        <Form.Select
                                                            id="disabledSelect"
                                                            {...register('language')}
                                                            aria-label="Default select example"
                                                        >
                                                            {generalSettingData?.currency?.map((data, index) => {
                                                                return (
                                                                    <>
                                                                        <option hidden value=''>--Select Language--</option>
                                                                        <option value="english"  >English - US  </option>
                                                                        <option value="hindi"> हिंदी - India </option>
                                                                        <option value="arabic"> عربى  - Arabic </option>
                                                                        <option value="bengali">বাঙালি - Bengali </option>
                                                                        <option value="spanish">Español - Spanish </option>
                                                                        <option value="french">français - French </option>
                                                                        <option value="portuguese">Português - Portuguese  </option>
                                                                        <option value="indonesia">Bhasa Indonesian - Indonesia </option>
                                                                        <option value="philippines"> Pilipinas - Philippines  </option>
                                                                    </>
                                                                );
                                                            })}

                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_mobile">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Business Mobile :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="tel"
                                                        {...register('businessMobile')}
                                                        placeholder="Mobile"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_landline">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Business Landline :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="tel"
                                                        {...register('landline')}
                                                        placeholder="landline"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <hr />
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_emailid">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Business Email ID :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control

                                                        type="text"
                                                        {...register('emailId'

                                                        )}
                                                        placeholder="Email ID"
                                                    />
                                                    {/* <Form.Control

                                                        type="text"
                                                        {...register('emailId',
                                                            {
                                                                required: 'Email is required',
                                                                pattern: {
                                                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                                    message: 'Please enter a valid email',
                                                                },
                                                            }
                                                        )}
                                                        placeholder="Email ID"
                                                        isInvalid={errors.emailId}
                                                    />
                                                    {errors.emailId && <span className='text-danger'>Please enter a valid email</span>} */}

                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_logo">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Business Logo :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="file"
                                                        {...register('logo')}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_timezone">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Time Zone :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group className="" placeholder="Member Group">
                                                        <Form.Select
                                                            id="disabledSelect"
                                                            {...register('timeZone')}
                                                            aria-label="Default select example"
                                                        > <option hidden value="">--Select--</option>
                                                            <option value="0">Africa / Abidjan</option><option value="1">Africa / Accra</option><option value="2">Africa / Addis_Ababa</option><option value="3">Africa / Algiers</option><option value="4">Africa / Asmara</option><option value="5">Africa / Bamako</option><option value="6">Africa / Bangui</option><option value="7">Africa / Banjul</option><option value="8">Africa / Bissau</option><option value="9">Africa / Blantyre</option><option value="10">Africa / Brazzaville</option><option value="11">Africa / Bujumbura</option><option value="12">Africa / Cairo</option><option value="13">Africa / Casablanca</option><option value="14">Africa / Ceuta</option><option value="15">Africa / Conakry</option><option value="16">Africa / Dakar</option><option value="17">Africa / Dar_es_Salaam</option><option value="18">Africa / Djibouti</option><option value="19">Africa / Douala</option><option value="20">Africa / El_Aaiun</option><option value="21">Africa / Freetown</option><option value="22">Africa / Gaborone</option><option value="23">Africa / Harare</option><option value="24">Africa / Johannesburg</option><option value="25">Africa / Juba</option><option value="26">Africa / Kampala</option><option value="27">Africa / Khartoum</option><option value="28">Africa / Kigaoption</option><option value="29">Africa / Kinshasa</option><option value="30">Africa / Lagos</option><option value="31">Africa / optionbreville</option><option value="32">Africa / Lome</option><option value="33">Africa / Luanda</option><option value="34">Africa / Lubumbashi</option><option value="35">Africa / Lusaka</option><option value="36">Africa / Malabo</option><option value="37">Africa / Maputo</option><option value="38">Africa / Maseru</option><option value="39">Africa / Mbabane</option><option value="40">Africa / Mogadishu</option><option value="41">Africa / Monrovia</option><option value="42">Africa / Nairobi</option><option value="43">Africa / Ndjamena</option><option value="44">Africa / Niamey</option><option value="45">Africa / Nouakchott</option><option value="46">Africa / Ouagadougou</option><option value="47">Africa / Porto-Novo</option><option value="48">Africa / Sao_Tome</option><option value="49">Africa / Tripooption</option><option value="50">Africa / Tunis</option><option value="51">Africa / Windhoek</option><option value="52">America / Adak</option><option value="53">America / Anchorage</option><option value="54">America / Anguilla</option><option value="55">America / Antigua</option><option value="56">America / Araguaina</option><option value="57">America / Argentina / Buenos_Aires</option><option value="58">America / Argentina / Catamarca</option><option value="59">America / Argentina / Cordoba</option><option value="60">America / Argentina / Jujuy</option><option value="61">America / Argentina / La_Rioja</option><option value="62">America / Argentina / Mendoza</option><option value="63">America / Argentina / Rio_Gallegos</option><option value="64">America / Argentina / Salta</option><option value="65">America / Argentina / San_Juan</option><option value="66">America / Argentina / San_Luis</option><option value="67">America / Argentina / Tucuman</option><option value="68">America / Argentina / Ushuaia</option><option value="69">America / Aruba</option><option value="70">America / Asuncion</option><option value="71">America / Atikokan</option><option value="72">America / Bahia</option><option value="73">America / Bahia_Banderas</option><option value="74">America / Barbados</option><option value="75">America / Belem</option><option value="76">America / Beoptionze</option><option value="77">America / Blanc-Sablon</option><option value="78">America / Boa_Vista</option><option value="79">America / Bogota</option><option value="80">America / Boise</option><option value="81">America / Cambridge_Bay</option><option value="82">America / Campo_Grande</option><option value="83">America / Cancun</option><option value="84">America / Caracas</option><option value="85">America / Cayenne</option><option value="86">America / Cayman</option><option value="87">America / Chicago</option><option value="88">America / Chihuahua</option><option value="89">America / Costa_Rica</option><option value="90">America / Creston</option><option value="91">America / Cuiaba</option><option value="92">America / Curacao</option><option value="93">America / Danmarkshavn</option><option value="94">America / Dawson</option><option value="95">America / Dawson_Creek</option><option value="96">America / Denver</option><option value="97">America / Detroit</option><option value="98">America / Dominica</option><option value="99">America / Edmonton</option><option value="100">America / Eirunepe</option><option value="101">America / El_Salvador</option><option value="102">America / Fort_Nelson</option><option value="103">America / Fortaleza</option><option value="104">America / Glace_Bay</option><option value="105">America / Goose_Bay</option><option value="106">America / Grand_Turk</option><option value="107">America / Grenada</option><option value="108">America / Guadeloupe</option><option value="109">America / Guatemala</option><option value="110">America / Guayaquil</option><option value="111">America / Guyana</option><option value="112">America / Haoptionfax</option><option value="113">America / Havana</option><option value="114">America / Hermosillo</option><option value="115">America / Indiana / Indianapooptions</option><option value="116">America / Indiana / Knox</option><option value="117">America / Indiana / Marengo</option><option value="118">America / Indiana / Petersburg</option><option value="119">America / Indiana / Tell_City</option><option value="120">America / Indiana / Vevay</option><option value="121">America / Indiana / Vincennes</option><option value="122">America / Indiana / Winamac</option><option value="123">America / Inuvik</option><option value="124">America / Iqaluit</option><option value="125">America / Jamaica</option><option value="126">America / Juneau</option><option value="127">America / Kentucky / Louisville</option><option value="128">America / Kentucky / Monticello</option><option value="129">America / Kralendijk</option><option value="130">America / La_Paz</option><option value="131">America / optionma</option><option value="132">America / Los_Angeles</option><option value="133">America / Lower_Princes</option><option value="134">America / Maceio</option><option value="135">America / Managua</option><option value="136">America / Manaus</option><option value="137">America / Marigot</option><option value="138">America / Martinique</option><option value="139">America / Matamoros</option><option value="140">America / Mazatlan</option><option value="141">America / Menominee</option><option value="142">America / Merida</option><option value="143">America / Metlakatla</option><option value="144">America / Mexico_City</option><option value="145">America / Miquelon</option><option value="146">America / Moncton</option><option value="147">America / Monterrey</option><option value="148">America / Montevideo</option><option value="149">America / Montserrat</option><option value="150">America / Nassau</option><option value="151">America / New_York</option><option value="152">America / Nipigon</option><option value="153">America / Nome</option><option value="154">America / Noronha</option><option value="155">America / North_Dakota / Beulah</option><option value="156">America / North_Dakota / Center</option><option value="157">America / North_Dakota / New_Salem</option><option value="158">America / Nuuk</option><option value="159">America / Ojinaga</option><option value="160">America / Panama</option><option value="161">America / Pangnirtung</option><option value="162">America / Paramaribo</option><option value="163">America / Phoenix</option><option value="164">America / Port-au-Prince</option><option value="165">America / Port_of_Spain</option><option value="166">America / Porto_Velho</option><option value="167">America / Puerto_Rico</option><option value="168">America / Punta_Arenas</option><option value="169">America / Rainy_River</option><option value="170">America / Rankin_Inlet</option><option value="171">America / Recife</option><option value="172">America / Regina</option><option value="173">America / Resolute</option><option value="174">America / Rio_Branco</option><option value="175">America / Santarem</option><option value="176">America / Santiago</option><option value="177">America / Santo_Domingo</option><option value="178">America / Sao_Paulo</option><option value="179">America / Scoresbysund</option><option value="180">America / Sitka</option><option value="181">America / St_Barthelemy</option><option value="182">America / St_Johns</option><option value="183">America / St_Kitts</option><option value="184">America / St_Lucia</option><option value="185">America / St_Thomas</option><option value="186">America / St_Vincent</option><option value="187">America / Swift_Current</option><option value="188">America / Tegucigalpa</option><option value="189">America / Thule</option><option value="190">America / Thunder_Bay</option><option value="191">America / Tijuana</option><option value="192">America / Toronto</option><option value="193">America / Tortola</option><option value="194">America / Vancouver</option><option value="195">America / Whitehorse</option><option value="196">America / Winnipeg</option><option value="197">America / Yakutat</option><option value="198">America / Yellowknife</option><option value="199">Antarctica / Casey</option><option value="200">Antarctica / Davis</option><option value="201">Antarctica / DumontDUrville</option><option value="202">Antarctica / Macquarie</option><option value="203">Antarctica / Mawson</option><option value="204">Antarctica / McMurdo</option><option value="205">Antarctica / Palmer</option><option value="206">Antarctica / Rothera</option><option value="207">Antarctica / Syowa</option><option value="208">Antarctica / Troll</option><option value="209">Antarctica / Vostok</option><option value="210">Arctic / Longyearbyen</option><option value="211">Asia / Aden</option><option value="212">Asia / Almaty</option><option value="213">Asia / Amman</option><option value="214">Asia / Anadyr</option><option value="215">Asia / Aqtau</option><option value="216">Asia / Aqtobe</option><option value="217">Asia / Ashgabat</option><option value="218">Asia / Atyrau</option><option value="219">Asia / Baghdad</option><option value="220">Asia / Bahrain</option><option value="221">Asia / Baku</option><option value="222">Asia / Bangkok</option><option value="223">Asia / Barnaul</option><option value="224">Asia / Beirut</option><option value="225">Asia / Bishkek</option><option value="226">Asia / Brunei</option><option value="227">Asia / Chita</option><option value="228">Asia / Choibalsan</option><option value="229">Asia / Colombo</option><option value="230">Asia / Damascus</option><option value="231">Asia / Dhaka</option><option value="232">Asia / Dioption</option><option value="233">Asia / Dubai</option><option value="234">Asia / Dushanbe</option><option value="235">Asia / Famagusta</option><option value="236">Asia / Gaza</option><option value="237">Asia / Hebron</option><option value="238">Asia / Ho_Chi_Minh</option><option value="239">Asia / Hong_Kong</option><option value="240">Asia / Hovd</option><option value="241">Asia / Irkutsk</option><option value="242">Asia / Jakarta</option><option value="243">Asia / Jayapura</option><option value="244">Asia / Jerusalem</option><option value="245">Asia / Kabul</option><option value="246">Asia / Kamchatka</option><option value="247">Asia / Karachi</option><option value="248">Asia / Kathmandu</option><option value="249">Asia / Khandyga</option><option value="250">Asia / Kolkata</option><option value="251">Asia / Krasnoyarsk</option><option value="252">Asia / Kuala_Lumpur</option><option value="253">Asia / Kuching</option><option value="254">Asia / Kuwait</option><option value="255">Asia / Macau</option><option value="256">Asia / Magadan</option><option value="257">Asia / Makassar</option><option value="258">Asia / Manila</option><option value="259">Asia / Muscat</option><option value="260">Asia / Nicosia</option><option value="261">Asia / Novokuznetsk</option><option value="262">Asia / Novosibirsk</option><option value="263">Asia / Omsk</option><option value="264">Asia / Oral</option><option value="265">Asia / Phnom_Penh</option><option value="266">Asia / Pontianak</option><option value="267">Asia / Pyongyang</option><option value="268">Asia / Qatar</option><option value="269">Asia / Qostanay</option><option value="270">Asia / Qyzylorda</option><option value="271">Asia / Riyadh</option><option value="272">Asia / Sakhaoptionn</option><option value="273">Asia / Samarkand</option><option value="274">Asia / Seoul</option><option value="275">Asia / Shanghai</option><option value="276">Asia / Singapore</option><option value="277">Asia / Srednekolymsk</option><option value="278">Asia / Taipei</option><option value="279">Asia / Tashkent</option><option value="280">Asia / Tbioptionsi</option><option value="281">Asia / Tehran</option><option value="282">Asia / Thimphu</option><option value="283">Asia / Tokyo</option><option value="284">Asia / Tomsk</option><option value="285">Asia / Ulaanbaatar</option><option value="286">Asia / Urumqi</option><option value="287">Asia / Ust-Nera</option><option value="288">Asia / Vientiane</option><option value="289">Asia / Vladivostok</option><option value="290">Asia / Yakutsk</option><option value="291">Asia / Yangon</option><option value="292">Asia / Yekaterinburg</option><option value="293">Asia / Yerevan</option><option value="294">Atlantic / Azores</option><option value="295">Atlantic / Bermuda</option><option value="296">Atlantic / Canary</option><option value="297">Atlantic / Cape_Verde</option><option value="298">Atlantic / Faroe</option><option value="299">Atlantic / Madeira</option><option value="300">Atlantic / Reykjavik</option><option value="301">Atlantic / South_Georgia</option><option value="302">Atlantic / St_Helena</option><option value="303">Atlantic / Stanley</option><option value="304">Austraoptiona / Adelaide</option><option value="305">Austraoptiona / Brisbane</option><option value="306">Austraoptiona / Broken_Hill</option><option value="307">Austraoptiona / Currie</option><option value="308">Austraoptiona / Darwin</option><option value="309">Austraoptiona / Eucla</option><option value="310">Austraoptiona / Hobart</option><option value="311">Austraoptiona / optionndeman</option><option value="312">Austraoptiona / Lord_Howe</option><option value="313">Austraoptiona / Melbourne</option><option value="314">Austraoptiona / Perth</option><option value="315">Austraoptiona / Sydney</option><option value="316">Europe / Amsterdam</option><option value="317">Europe / Andorra</option><option value="318">Europe / Astrakhan</option><option value="319">Europe / Athens</option><option value="320">Europe / Belgrade</option><option value="321">Europe / Beroptionn</option><option value="322">Europe / Bratislava</option><option value="323">Europe / Brussels</option><option value="324">Europe / Bucharest</option><option value="325">Europe / Budapest</option><option value="326">Europe / Busingen</option><option value="327">Europe / Chisinau</option><option value="328">Europe / Copenhagen</option><option value="329">Europe / Duboptionn</option><option value="330">Europe / Gibraltar</option><option value="331">Europe / Guernsey</option><option value="332">Europe / Helsinki</option><option value="333">Europe / Isle_of_Man</option><option value="334">Europe / Istanbul</option><option value="335">Europe / Jersey</option><option value="336">Europe / Kaoptionningrad</option><option value="337">Europe / Kiev</option><option value="338">Europe / Kirov</option><option value="339">Europe / optionsbon</option><option value="340">Europe / Ljubljana</option><option value="341">Europe / London</option><option value="342">Europe / Luxembourg</option><option value="343">Europe / Madrid</option><option value="344">Europe / Malta</option><option value="345">Europe / Mariehamn</option><option value="346">Europe / Minsk</option><option value="347">Europe / Monaco</option><option value="348">Europe / Moscow</option><option value="349">Europe / Oslo</option><option value="350">Europe / Paris</option><option value="351">Europe / Podgorica</option><option value="352">Europe / Prague</option><option value="353">Europe / Riga</option><option value="354">Europe / Rome</option><option value="355">Europe / Samara</option><option value="356">Europe / San_Marino</option><option value="357">Europe / Sarajevo</option><option value="358">Europe / Saratov</option><option value="359">Europe / Simferopol</option><option value="360">Europe / Skopje</option><option value="361">Europe / Sofia</option><option value="362">Europe / Stockholm</option><option value="363">Europe / Taloptionnn</option><option value="364">Europe / Tirane</option><option value="365">Europe / Ulyanovsk</option><option value="366">Europe / Uzhgorod</option><option value="367">Europe / Vaduz</option><option value="368">Europe / Vatican</option><option value="369">Europe / Vienna</option><option value="370">Europe / Vilnius</option><option value="371">Europe / Volgograd</option><option value="372">Europe / Warsaw</option><option value="373">Europe / Zagreb</option><option value="374">Europe / Zaporozhye</option><option value="375">Europe / Zurich</option><option value="376">Indian / Antananarivo</option><option value="377">Indian / Chagos</option><option value="378">Indian / Christmas</option><option value="379">Indian / Cocos</option><option value="380">Indian / Comoro</option><option value="381">Indian / Kerguelen</option><option value="382">Indian / Mahe</option><option value="383">Indian / Maldives</option><option value="384">Indian / Mauritius</option><option value="385">Indian / Mayotte</option><option value="386">Indian / Reunion</option><option value="387">Pacific / Apia</option><option value="388">Pacific / Auckland</option><option value="389">Pacific / Bougainville</option><option value="390">Pacific / Chatham</option><option value="391">Pacific / Chuuk</option><option value="392">Pacific / Easter</option><option value="393">Pacific / Efate</option><option value="394">Pacific / Enderbury</option><option value="395">Pacific / Fakaofo</option><option value="396">Pacific / Fiji</option><option value="397">Pacific / Funafuti</option><option value="398">Pacific / Galapagos</option><option value="399">Pacific / Gambier</option><option value="400">Pacific / Guadalcanal</option><option value="401">Pacific / Guam</option><option value="402">Pacific / Honolulu</option><option value="403">Pacific / Kiritimati</option><option value="404">Pacific / Kosrae</option><option value="405">Pacific / Kwajalein</option><option value="406">Pacific / Majuro</option><option value="407">Pacific / Marquesas</option><option value="408">Pacific / Midway</option><option value="409">Pacific / Nauru</option><option value="410">Pacific / Niue</option><option value="411">Pacific / Norfolk</option><option value="412">Pacific / Noumea</option><option value="413">Pacific / Pago_Pago</option><option value="414">Pacific / Palau</option><option value="415">Pacific / Pitcairn</option><option value="416">Pacific / Pohnpei</option><option value="417">Pacific / Port_Moresby</option><option value="418">Pacific / Rarotonga</option><option value="419">Pacific / Saipan</option><option value="420">Pacific / Tahiti</option><option value="421">Pacific / Tarawa</option><option value="422">Pacific / Tongatapu</option><option value="423">Pacific / Wake</option><option value="424">Pacific / Waloptions</option><option value="425">UTC</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_currency">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Currency (USD) :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group className="" placeholder="Member Group">
                                                        <Form.Select
                                                            id="disabledSelect"
                                                            {...register('currency')}
                                                            aria-label="Default select example"
                                                            placeholder="Member Group"
                                                        >
                                                            <option hidden value=''>---Select---</option>

                                                            {generalSettingData?.currency?.map((data, index) => {
                                                                return (
                                                                    <>
                                                                        <option value="Syria" selected="selected">Syria ( £ / SYP )</option>
                                                                    </>
                                                                );
                                                            })}
                                                        </Form.Select>
                                                    </Form.Group>

                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_showsystem">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Show System :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group className="" placeholder="Member Group">
                                                        <Form.Select
                                                            id="disabledSelect"
                                                            {...register('showSystem')}
                                                            aria-label="Default select example"

                                                        >
                                                            <option hidden value=''>---Select---</option>

                                                            {generalSettingData?.currency?.map((data, index) => {
                                                                return (
                                                                    <>
                                                                        <option value="symbol" selected="selected">£</option>
                                                                        <option value="code" selected="selected">SYP</option>
                                                                    </>
                                                                );
                                                            })}

                                                        </Form.Select>
                                                    </Form.Group>

                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_setcurrencydecimal">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Set currency in no. of decimal places :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="number"
                                                        {...register('setCurrencyDecimal')}
                                                        aria-label="Default select example"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_allzipcode">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Open For All Pin Code{starRequired} :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group className="" placeholder="Member Group">
                                                        <Form.Select
                                                            id="disabledSelect"
                                                            {...register('allZipCode', { required: true })}
                                                            isInvalid={errors.allZipCode}
                                                            aria-label="Default select example"
                                                        >
                                                            {generalSettingData?.currency?.map((data, index) => {
                                                                return (
                                                                    <>
                                                                        <option hidden value=''>--Select--</option>
                                                                        <option value="yes">Yes</option>
                                                                        <option value="no">No</option>
                                                                    </>
                                                                );
                                                            })}

                                                        </Form.Select>
                                                    </Form.Group>
                                                    {errors.allZipCode && <span className='text-danger'>Please select one Zip code</span>}

                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_templatename">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Template Name :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group>
                                                        <Form.Select
                                                            id="disabledSelect"
                                                            {...register('templateName')}

                                                            aria-label="Default select example"
                                                        >
                                                            {generalSettingData?.currency?.map((data, index) => {
                                                                return (
                                                                    <>
                                                                        <option hidden value=''>--Select--</option>
                                                                        <option value="Turns">Turns App</option>
                                                                        <option value="App">Turns</option>
                                                                    </>
                                                                );
                                                            })}

                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_mobiletemplate">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Mobile Template :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="tel"
                                                        {...register('mobileTemplate')}
                                                        placeholder="Mobile"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_orderedform">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Start ordered from :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('orderId')}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_autodriverassign">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Auto Driver Assign :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group controlId="ne_topwash" className='d-flex'>
                                                        <Form.Check
                                                            {...register('autoDriver')}
                                                            value="On"
                                                            label="ON"
                                                            name='autoDriver'
                                                            feedback="You must agree before submitting."
                                                        />
                                                        <Form.Check
                                                            {...register('autoDriver')}
                                                            label="OFF"
                                                            value="Off"
                                                            name='autoDriver'
                                                            className='ms-3'
                                                            feedback="You must agree before submitting."
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_challanForm">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Start Challan from :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('challanForm')}
                                                        placeholder="Challan Form"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_pickupRequestid">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Start Pickup Request Id from :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="text"
                                                        value='PIC'
                                                        {...register('pickup')}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_deliveryRequest">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Start Delivery Request Id from :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group className="" placeholder="Member Group">
                                                        <Form.Control
                                                            type="text"
                                                            value='DEL'
                                                            {...register('delivery')}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_facebooklink">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Facebook Link :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('facebook')}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_instagramlink">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Instagram Link :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('instagram')}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_rwitterlink">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Twitter Link :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('twitter')}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_skypelink">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Skype Link :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('skype')}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_linkedinlink">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Linkedin Link :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('linkedin')}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_yelplink">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Yelp Link :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('yelp')}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_retailorderedform">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Start Retail Ordered From :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('retailOrderForm'
                                                        )}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6}>
                                        <Form.Group controlId="ne_pinterestlink">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Pinterest Link :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('pinterestLink'
                                                        )}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_googlemap">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Address Map :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <div className="gmaps" style={{ position: 'relative', overflow: 'hidden' }}>
                                                        <Map
                                                            {...register('googleMap')}
                                                            google={props.google}
                                                            zoom={14}
                                                            initialCenter={{ lat: 30.733315, lng: 76.779419 }}
                                                            style={{ width: '100%', height: '100%', position: 'relative' }}
                                                            zoomControlOptions={{
                                                                position: props?.google?.maps.ControlPosition.LEFT_TOP,
                                                            }}>
                                                            <Marker name={'Current location'} />
                                                        </Map>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            value={`${mapGoogle.lat}, ${mapGoogle.lng}`}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center  pt-5">
                                        <Button type="submit" className="btn-lg btn-success">
                                            Update
                                        </Button>
                                        <Button type="reset" className="btn-lg px-3 btn-light ms-3">
                                            Reset
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>}

            </Card>}

        </>
    )
}

export default (GoogleApiWrapper({
    apiKey: 'AIzaSyAuUS28FL-MC7zQ2SqgbFSKAUFNzE4JAgs',
})(SystemSettingsForm));
