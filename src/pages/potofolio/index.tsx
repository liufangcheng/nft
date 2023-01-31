import React, { FC, useState, useRef, useEffect } from 'react';
import ListCard from './ListCard';
import InvitationCode from './InvitationCode';
import MyDiscordSpaces from './MyDiscordSpaces';
import InvitationRecord from './InvitationRecord';
import styles from './styles/index.module.less';
import { Form, Input, Message, Modal } from '@arco-design/web-react';
// import { IconSettings } from '@arco-design/web-react/icon';
import SuccessTwitter from './SuccessTwitter';
import ConnetTwitter from './ConnetTwitter';
import LoginInvitationCode from './LoginInvitationCode';
import IconSettings from '../../../public/svg/设置.svg';
import { logout, myLocalStorage } from '@/utils';
import LoginModal from '@/components/LoginModal';
import { DetailDrawerRef } from '@/components/LoginModal/typings';
import { useLocale, useMyStore } from '@/utils/hooks';
import { twitterApi, getUserApi } from '@/services';
import { useHistory } from 'react-router';
import { server } from '@/config';
import form from '@arco-design/web-react/es/Form/form';
import FormItem from '@arco-design/web-react/es/Form/form-item';
import useForm from '@arco-design/web-react/es/Form/useForm';
import SettingsModal from './SettingsModal';

const Potofolio: FC = () => {
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const [disconnectVisible, setDisconnectVisible] = useState(false);
  const [form] = useForm();
  const loginRef = useRef<DetailDrawerRef>();
  const { state, dispatch } = useMyStore();
  const { userInfo } = state;
  const history = useHistory();
  const settingsRef = useRef<DetailDrawerRef>();
  const {
    location: { search },
  } = history;
  const getUserInfo = async () => {
    const { data } = await getUserApi.getUser();
    console.log(data);
    myLocalStorage.setValue('userInfo', data.userInfo);
    dispatch({
      type: 'update-userInfo',
      payload: {
        userInfo: data.userInfo,
      },
    });
  };
  const parameters = async () => {
    if (search) {
      try {
        const searchOne = search.substring(1).split('&');
        const oauthToken = searchOne[0].split('=')[1];
        const oauthVerifier = searchOne[1].split('=')[1];
        const tokenSecret = state.tokenSecret;
        await twitterApi.bindTwitter({
          oauthToken,
          oauthVerifier,
          tokenSecret,
        });
        getUserInfo();
      } catch (error) {}
    }
  };
  useEffect(() => {
    parameters();
  }, []);

  return (
    <div>
      <div className={userInfo ? styles.contentImg : styles.contentImg1}>
        <div className={styles.avaImage}>
          {userInfo ? (
            <img
              src="/images/9.png"
              alt=""
              className="w100 h100 "
              style={{ zIndex: 999999 }}
            />
          ) : (
            <img src="/svg/默认头像.svg" alt="" className="w100 h100 " />
          )}
        </div>
      </div>
      <SettingsModal ref={settingsRef}></SettingsModal>
      <Modal
        visible={disconnectVisible}
        className={styles.modalDisconnect}
        closable={false}
        footer={null}
      >
        <div>
          <div
            style={{ textAlign: 'right' }}
            onClick={() => setDisconnectVisible(false)}
          >
            <img src="/svg/关闭.svg" alt="" />
          </div>
          <div className={styles.disconnect}>
            <img src="/svg/解绑.svg" alt="" />
          </div>
          <div
            className={`${styles.disconnectText} ${styles.disconnectMargin}`}
          >
            Are you sure you want to{' '}
          </div>
          <div className={styles.disconnectText}>disconnect twitter </div>
          <div className={styles.serveSpace}>
            You will lose 5 server space after disconnect twitter
          </div>
          <div className="flex" style={{ marginTop: '50px', gap: '16px' }}>
            <div
              className={styles.yes}
              onClick={async () => {
                try {
                  await twitterApi.cancelTwitterBind();
                  Message.success({
                    content: 'disconnect twitter successfully!',
                    className: 'message',
                  });
                  getUserInfo();
                  setDisconnectVisible(false);
                } catch (error) {}
              }}
            >
              Yes
            </div>
            <div className={styles.no}>No</div>
          </div>
        </div>
      </Modal>

      <div className="plr">
        {userInfo ? (
          <div>
            <div className={styles.homeTitle}>
              {userInfo?.name ? userInfo?.name : userInfo?.email}
            </div>
            <div className="mt16 flex justify-between">
              <div className="flex ">
                <img
                  src="/icon/sx.png"
                  alt=""
                  style={{ width: '22px', height: '22px' }}
                />
                <div
                  style={{
                    marginLeft: '10px',
                  }}
                >
                  0x6Ba7f4d...aB2Ea
                </div>
              </div>
              <div className={styles.Settings}>
                <div className={styles.svgSettings}>
                  <IconSettings></IconSettings>
                  <span>{locale('personalCenter.Settings')}</span>
                </div>
                <div className={styles.settingContent}>
                  <div className={styles.settingDown}>
                    <div
                      className={styles.changeEmail}
                      onClick={() => {
                        settingsRef.current.init();
                      }}
                    >
                      {locale('personalCenter.Change.email')}
                    </div>

                    <div
                      className={styles.twitter}
                      onClick={() => {
                        if (userInfo?.twitter_id_str) {
                          setDisconnectVisible(true);
                        } else {
                          Message.warning({
                            content: 'Please bind twitter!',
                            className: 'messageWarn',
                          });
                        }
                      }}
                    >
                      {locale('personalCenter.Disconnect.Twitter')}
                    </div>

                    <div
                      className={styles.logout}
                      onClick={() => {
                        logout();
                      }}
                    >
                      {locale('personalCenter.logout')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div
              className={styles.loginTitle}
              onClick={() => {
                loginRef.current.init();
              }}
            >
              {locale('personalCenter.Click.to.login')}
            </div>
            <div className="mt16 flex justify-between">
              <div className="flex ">
                <img
                  src="/svg/钱包.svg"
                  alt=""
                  style={{ width: '22px', height: '22px' }}
                />
                <div
                  className={styles.connectWallet}
                  style={{
                    marginLeft: '10px',
                  }}
                  onClick={() => {
                    console.log(111);
                  }}
                >
                  {locale('personalCenter.Connect.to.your.wallet')}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mt24 flex " style={{ gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <ListCard userInfo={userInfo}></ListCard>
          </div>
          {userInfo ? (
            <div>
              <div>
                {userInfo?.twitter_id_str ? (
                  <SuccessTwitter></SuccessTwitter>
                ) : (
                  <ConnetTwitter></ConnetTwitter>
                )}
              </div>
              <div style={{ marginTop: '4px' }}>
                <InvitationCode
                  invitation_code={userInfo.invitation_code}
                ></InvitationCode>
              </div>
              <div style={{ marginTop: '4px' }}>
                <MyDiscordSpaces></MyDiscordSpaces>
              </div>
              <div style={{ marginTop: '4px' }}>
                <InvitationRecord></InvitationRecord>
              </div>
            </div>
          ) : (
            <div>
              {/* <div></div> */}
              <div style={{ marginTop: '4px' }}>
                <LoginInvitationCode></LoginInvitationCode>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <LoginModal ref={loginRef}></LoginModal>
      </div>
    </div>
  );
};
export default Potofolio;
