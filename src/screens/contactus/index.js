import {useContext, useState} from 'react';
import {SafeArea} from '../../components/SafeArea';
import {Textinput} from '../../components/Textinput';
import {CONTACT_US} from '../../constants/Buttontitles';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Context} from '../../navigation/BottomTab';
import {apiService} from '../../services/apiService';
import {RAISE_QUERY_CALL} from '../../constants/Apicall';
import {STATUS_SUCCESS} from '../../constants/ApiParams';
import {AlertMessage} from '../../utils/Alertmessage';
import {SOME_ERROR_OCCURED} from '../../constants/Messages';

export const ContactUs = () => {
  const [Subject, setSubject] = useState('');
  const [Details, setDetails] = useState('');
  const {setLoading} = useContext(Context) || {};

  const submitQuery = async () => {
    setLoading(true);
    const response = await apiService.post(RAISE_QUERY_CALL, {
      Subject,
      Details,
    });
    if (response.status === STATUS_SUCCESS) {
      setLoading(false);
      setSubject('');
      setDetails('');
      return AlertMessage(response.message);
    } else {
      return AlertMessage(SOME_ERROR_OCCURED);
    }
  };
  return (
    <SafeArea go_back text={CONTACT_US}>
      <Textinput
        custVal={Subject}
        setCustVal={setSubject}
        customstyles={{marginBottom: 12}}
        placeholder={'Enter subject'}
      />
      <Textinput
        custVal={Details}
        setCustVal={setDetails}
        customstyles={{height: 200}}
        props={{multiline: true}}
        placeholder={'Enter details(the more the better)'}
      />
      <AuthenticationButton
        customstyles={{marginTop: 20}}
        text={'SUBMIT'}
        onPress={() => submitQuery()}
      />
    </SafeArea>
  );
};
