"use client";

import AppModal from "@/components/AppModal";
import { appRouteLinks } from "@/utils/constants";
import {
  Box,
  Button,
  Flex,
  ListItem,
  OrderedList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";

export default function TermsAndConditionsPage() {
  const {
    isOpen: isDeclineModal,
    onClose: closeDeclineModal,
    onOpen: openDeclineModal,
  } = useDisclosure();

  return (
    <>
      <Box>
        <Text fontWeight="500" fontSize="lg">
          ProSocial Networks LLC Terms of Use Agreement
        </Text>
        &nbsp;
        <Text>Effective on 01/01/2024</Text>
        &nbsp;
        <Text fontWeight="500">1. INTRODUCTION</Text>
        &nbsp;
        <Text>
          By accessing or using ProSocials Services, you agree to be bound by
          this Terms of Use Agreement (the &quot;Terms&quot; or
          &quot;Agreement&quot;), including our Privacy Policy, Cookie Policy,
          Community Rules, and Safety Tips, so it is critical that you read this
          Agreement and these policies and procedures carefully before you
          create an account.
        </Text>
        &nbsp;
        <Text>
          PLEASE CAREFULLY REVIEW THE DISPUTE RESOLUTION PROVISIONS IN SECTION
          15 BELOW. THESE GOVERN THE MANNER IN WHICH CLAIMS WILL BE ADDRESSED
          BETWEEN YOU AND PROSIAL. THESE PROVISIONS INCLUDE A MANDATORY
          PRE-ARBITRATION INFORMAL DISPUTE RESOLUTION PROCESS, AN ARBITRATION
          AGREEMENT, SMALL CLAIMS COURT ELECTION, CLASS ACTION WAIVER,
          ADDITIONAL PROCEDURES FOR MASS ARBITRATION FILINGS, AND JURY TRIAL
          WAIVER THAT AFFECT YOUR RIGHTS. IN ARBITRATION, THERE IS TYPICALLY
          LESS DISCOVERY AND APPELLATE REVIEW THAN IN COURT.
        </Text>
        &nbsp;
        <Text>
          ProSocial reserves the right to update these Terms periodically, so
          check this page regularly for updates.
        </Text>
        &nbsp;
        <Text>
          Welcome to ProSocial, operated by ProSocial Networks, LLC, in the case
          of users originating from within the United States. As used in this
          Agreement, the terms &quot;ProSocial,&quot; &quot;us,&quot;
          &quot;we,&quot; the &quot;Company&quot;, and &quot;our&quot; shall
          refer to ProSocial Networks, LLC and/or prosocialapp.com, as
          appropriate. Together you and ProSocial may be referred to as the
          &quot;Parties&quot; or separately as &quot;Party.&quot;
        </Text>
        &nbsp;
        <Text>
          By accessing or using our Services on prosocialapp.com (the
          &quot;Website&quot;), the ProSocial mobile application (the
          &quot;App&quot;), or any other platforms or services ProSocial may
          offer (collectively, the &quot;Service&quot; or our
          &quot;Services&quot;), you agree to, and are bound by, this Agreement.
          This Agreement applies to anyone who accesses or uses our Services,
          regardless of registration or subscription status.
        </Text>
        &nbsp;
        <Text>
          Your access and use of our Services is also subject to the Privacy
          Policy, Cookie Policy, Community Rules, and Safety Tips and any terms
          disclosed and agreed to by you when you purchase additional features,
          products, or services from ProSocial (&quot;Additional Terms Upon
          Purchase&quot;), which are incorporated into this Agreement by
          reference. If you do not wish to be bound by this Agreement, do not
          access or use our Services.
        </Text>
        &nbsp;
        <Text>
          We reserve the right to modify, amend, or change the Terms at any
          time. Notice of any material change will be posted on this page with
          an updated effective date. In certain circumstances, we may notify you
          of a change to the Terms via email or other means; however, you are
          responsible for regularly checking this page for any changes. Your
          ongoing access or use of our Services constitutes your ongoing consent
          to any changes, and as a result, you will be legally bound by the
          updated Terms. If you do not accept a change to the Terms, you must
          stop accessing or using our Services immediately.
        </Text>
        &nbsp;
        <Text fontWeight="500">
          2. ACCOUNT ELIGIBILITY; YOUR RESPONSIBILITIES
        </Text>
        &nbsp;
        <Text>
          Before you create an account on ProSocial, it is your responsibility
          to ensure you are eligible to use our Services. This Section also
          details what you can and can’t do when using the Services, as well as
          the rights you grant ProSocial. You are not authorized to create an
          account or use the Services unless all of the following are true, and
          by using our Services, you represent and warrant that:
        </Text>
        &nbsp;
        <Text>1. You are at least 18 years old;</Text>
        &nbsp;
        <Text>
          2. You are legally qualified to enter a binding contract with
          ProSocial;
        </Text>
        &nbsp;
        <Text>3. You are located in the U.S.;</Text>
        &nbsp;
        <Text>4. You are not prohibited by law from using our Services;</Text>
        &nbsp;
        <Text>
          5. You have not committed, been convicted of, or pled no contest to a
          felony or indictable offense (or crime of similar severity), a sex
          crime, or any crime involving violence or a threat of violence, unless
          you have received clemency for a non-violent crime and we have
          determined that you are not likely to pose a threat to other users of
          our Services;
        </Text>
        &nbsp;
        <Text>
          6. You are not required to register as a sex offender with any state,
          federal or local sex offender registry;
        </Text>
        &nbsp;
        <Text>
          7. You do not have more than one account on our Services; and
        </Text>
        &nbsp;
        <Text>
          8. You have not previously been removed from our Services or our
          affiliates’ services by us or our affiliates, unless you have our
          express written permission to create a new account.
        </Text>
        &nbsp;
        <Text>
          If at any time you cease to meet these requirements, all authorization
          to access our Services or systems is automatically revoked, and you
          must immediately delete your account.
        </Text>
        &nbsp;
        <Text>You agree to:</Text>
        &nbsp;
        <OrderedList>
          <ListItem>
            Comply with these Terms, and check this page from time to time to
            ensure you are aware of any changes;
          </ListItem>
          &nbsp;
          <ListItem>
            Comply with all applicable laws, including without limitation,
            privacy laws, intellectual property laws, anti- spam laws, and
            regulatory requirements;
          </ListItem>
          &nbsp;
          <ListItem>Use the latest version of the Website and/or App;</ListItem>
          &nbsp;
          <ListItem>
            Treat other users in a courteous and respectful manner, both on and
            off our Services;
          </ListItem>
          &nbsp;
          <ListItem>
            Be respectful when communicating with any of our customer care
            representatives or other employees;
          </ListItem>
          &nbsp;
          <ListItem>Review the Safety Tips;</ListItem>
          &nbsp;
          <ListItem>
            Maintain a strong password and take reasonable measures to protect
            the security of your login information.
          </ListItem>
        </OrderedList>
        &nbsp;
        <Text>You agree that you will not:</Text>
        &nbsp;
        <OrderedList>
          <ListItem>
            Misrepresent your identity, age, current or previous positions,
            qualifications, or affiliations with a person or entity;
          </ListItem>
          &nbsp;
          <ListItem>
            Use the Services in a way that damages the Services or prevents
            their use by other users;
          </ListItem>
          &nbsp;
          <ListItem>
            Use our Services in a way to interfere with, disrupt or negatively
            affect the platform, the servers, or our Services’ networks;
          </ListItem>
          &nbsp;
          <ListItem>
            Use our Services for any harmful, illegal, or nefarious purpose;
          </ListItem>
          &nbsp;
          <ListItem>
            Harass, bully, stalk, intimidate, assault, defame, harm or otherwise
            mistreat any person;
          </ListItem>
          &nbsp;
          <ListItem>Post or share Prohibited Content (see below);</ListItem>
          &nbsp;
          <ListItem>
            Solicit passwords for any purpose, or personal identifying
            information for commercial or unlawful purposes from other users or
            disseminate another person’s personal information without his or her
            permission;
          </ListItem>
          &nbsp;
          <ListItem>
            Solicit money or other items of value from another user, whether as
            a gift, loan, or form of compensation;
          </ListItem>
          &nbsp;
          <ListItem>Use another user’s account;</ListItem>
          &nbsp;
          <ListItem>
            Use our Services in relation to fraud, a pyramid scheme, or other
            similar practice; or
          </ListItem>
          &nbsp;
          <ListItem>
            Violate the terms of the license granted to you by ProSocial (see
            Section 6 below).
          </ListItem>
          &nbsp;
          <ListItem>
            Disclose private or proprietary information that you do not have the
            right to disclose;
          </ListItem>
          &nbsp;
          <ListItem>
            Copy, modify, transmit, distribute, or create any derivative works
            from any of our Content, or any
          </ListItem>
        </OrderedList>
        &nbsp;
        <Text>
          copyrighted material, images, trademarks, trade names, service marks,
          or other intellectual property, content or proprietary information
          accessible through our Services without ProSocial prior written
          consent;
        </Text>
        &nbsp;
        <OrderedList>
          <ListItem>
            Express or imply that any statements you make are endorsed by
            ProSocial;
          </ListItem>
          &nbsp;
          <ListItem>
            Use any robot, crawler, site search/retrieval application, proxy or
            other manual or automatic device, method or process to access,
            retrieve, index, &quot;data mine,&quot; or in any way reproduce or
            circumvent the navigational structure or presentation of our
            Services or its contents;
          </ListItem>
          &nbsp;
          <ListItem>
            Upload viruses or other malicious code or otherwise compromise the
            security of our Services;
          </ListItem>
          &nbsp;
          <ListItem>
            Forge headers or otherwise manipulate identifiers to disguise the
            origin of any information transmitted to or through our Services;
          </ListItem>
          &nbsp;
          <ListItem>
            &quot;Frame&quot; or &quot;mirror&quot; any part of our Services
            without ProSocial prior written authorization;
          </ListItem>
          &nbsp;
          <ListItem>
            Use meta tags or code or other devices containing any reference to
            ProSocial or the platform (or any trademark, trade name, service
            mark, logo or slogan of ProSocial) to direct any person to any other
            website for any purpose;
          </ListItem>
          &nbsp;
          <ListItem>
            Modify, adapt, sublicense, translate, sell, reverse engineer,
            decipher, decompile or otherwise disassemble any portion of our
            Services, or cause others to do so;
          </ListItem>
          &nbsp;
          <ListItem>
            Use or develop any third-party applications that interact with our
            Services or Member Content or information without our written
            consent;
          </ListItem>
          &nbsp;
          <ListItem>
            Use, access, or publish the ProSocial application programming
            interface without our written consent;
          </ListItem>
          &nbsp;
          <ListItem>
            Probe, scan or test the vulnerability of our Services or any system
            or network;
          </ListItem>
          &nbsp;
          <ListItem>
            Encourage, promote, or agree to engage in any activity that violates
            these Terms; or
          </ListItem>
          &nbsp;
          <ListItem>
            Create a new account after we suspend or terminate your account,
            unless you receive our express permission.
          </ListItem>
        </OrderedList>
        &nbsp;
        <Text>
          The license granted to you under these Terms and any authorization to
          access the Services is automatically revoked in the event that you do
          any of the above.
        </Text>
        &nbsp;
        <Text>
          Prohibited Content—ProSocial prohibits uploading or sharing content
          that:
        </Text>
        &nbsp;
        <OrderedList>
          <ListItem>
            Is likely to be deemed offensive or to harass, upset, embarrass,
            alarm or annoy any other person;
          </ListItem>
          &nbsp;
          <ListItem>
            Is obscene, pornographic, violent or otherwise may offend human
            dignity, or contains nudity;
          </ListItem>
          &nbsp;
          <ListItem>
            Is abusive, insulting or threatening, discriminatory or that
            promotes or encourages racism, sexism, hatred or bigotry;
          </ListItem>
          &nbsp;
          <ListItem>
            Encourages or facilitates any illegal activity including, without
            limitation, terrorism, inciting racial hatred or the submission of
            which in itself constitutes committing a criminal offense;
          </ListItem>
          &nbsp;
          <ListItem>Is defamatory, libelous, or untrue;</ListItem>
          &nbsp;
          <ListItem>
            Relates to commercial activities (including, without limitation,
            sales, competitions, promotions, and advertising, solicitation for
            services, sexual or otherwise, links to other websites or premium
            line telephone numbers);
          </ListItem>
          &nbsp;
          <ListItem>
            Involves the transmission of &quot;junk&quot; mail or
            &quot;spam&quot;;
          </ListItem>
          &nbsp;
          <ListItem>
            Contains any spyware, adware, viruses, corrupt files, worm programs
            or other malicious code designed to interrupt, damage or limit the
            functionality of or disrupt any software, hardware,
            telecommunications, networks, servers or other equipment, Trojan
            horse or any other material designed to damage, interfere with,
            wrongly intercept or expropriate any data or personal information
            whether from ProSocial or otherwise;
          </ListItem>
          &nbsp;
          <ListItem>
            Infringes upon any third party’s rights (including, without
            limitation, intellectual property rights and privacy rights);
          </ListItem>
          &nbsp;
          <ListItem>
            Was not written by you or was automatically generated, unless
            expressly authorized by ProSocial;
          </ListItem>
          &nbsp;
          <ListItem>
            Includes the image or likeness of another person without that
            person’s consent (or in the case of a minor, the minor’s parent or
            guardian), or is an image or likeness of a minor unaccompanied by
            the minor’s parent or guardian; Is inconsistent with the intended
            use of the Services; or
          </ListItem>
          &nbsp;
          <ListItem>
            May harm the reputation of ProSocial or its affiliates.
          </ListItem>
        </OrderedList>
        &nbsp;
        <Text>
          The uploading or sharing of content that violates these Terms
          (&quot;Prohibited Content&quot;) may result in the immediate
          suspension or termination of your account.
        </Text>
        &nbsp;
        <Text fontWeight="500">3. CONTENT</Text>
        &nbsp;
        <Text>
          You are expressly prohibited from posting inappropriate content. While
          using our Services, you will have access to: (i) content that you
          upload or provide while using our Services (&quot;Your Content&quot;);
          (ii) content that other users upload or provide while using our
          Services (&quot;Member Content&quot;); and (iii) content that
          ProSocial provides on and through our Services (&quot;Our
          Content&quot;). In this agreement, &quot;content&quot; includes,
          without limitation, all text, images, video, audio, or other material
          on our Services, including information on users’ profiles and in
          direct messages between users.
        </Text>
        &nbsp;
        <Text fontWeight="500">3A. YOUR CONTENT</Text>
        &nbsp;
        <Text>
          You are responsible for Your Content. Don’t share anything that you
          wouldn’t want others to see, that would violate this Agreement, or
          that may expose you or us to legal liability.
        </Text>
        &nbsp;
        <Text>
          You are solely responsible and liable for Your Content, and,
          therefore, you agree to indemnify, defend, release, and hold us
          harmless from any claims made in connection with Your Content.
        </Text>
        &nbsp;
        <Text>
          You represent and warrant to us that the information you provide to us
          or any other user is accurate, including any information submitted
          through Facebook or other third-party sources (if applicable), and
          that you will update your account information as necessary to ensure
          its accuracy.
        </Text>
        &nbsp;
        <Text>
          The content included on your individual profile should be relevant to
          the intended use of our Services. You may not display any personal
          contact or banking information, whether in relation to you or any
          other person (for example, names, home addresses or postcodes,
          telephone numbers, email addresses, URLs, credit/debit card or other
          banking details). If you choose to reveal any personal information
          about yourself to other users, you do so at your own risk. We
          encourage you to use caution in disclosing any personal information
          online.
        </Text>
        &nbsp;
        <Text>
          You acknowledge and agree that Your Content may be viewed by other
          users. By uploading Your Content, you represent and warrant to us that
          you have all necessary rights and licenses to do so and automatically
          grant us a license to use Your Content as provided under Section 7
          below.
        </Text>
        &nbsp;
        <Text>
          You understand and agree that we may monitor or review Your Content,
          and we have the right to remove, delete, edit, limit, or block or
          prevent access to any of Your Content at any time in our sole
          discretion. Furthermore, you understand agree that we have no
          obligation to display or review Your Content.
        </Text>
        &nbsp;
        <Text>3B. MEMBER CONTENT</Text>
        &nbsp;
        <Text>
          While you will have access to Member Content, it is not yours and you
          may not copy or use Member Content for any purpose except as
          contemplated by these Terms. Other users will also share content on
          our Services. Member Content belongs to the user who posted the
          content and is stored on our servers and displayed at the direction of
          that user. You do not have any rights in relation to Member Content,
          and, unless expressly authorized by ProSocial, you may only use Member
          Content to the extent that your use is consistent with our Services’
          purpose of allowing users to communicate with and meet one another.
          You may not copy the Member Content or use Member Content for
          commercial purposes, to spam, to harass, or to make unlawful threats.
          We reserve the right to terminate your account if you misuse Member
          Content.
        </Text>
        &nbsp;
        <Text fontWeight="500">3C. OUR CONTENT</Text>
        &nbsp;
        <Text>ProSocial owns all other content on our Services.</Text>
        &nbsp;
        <Text>
          Any other text, content, graphics, user interfaces, trademarks, logos,
          sounds, artwork, images, and other intellectual property appearing on
          our Services is owned, controlled or licensed by us and protected by
          copyright, trademark and other intellectual property law rights. All
          rights, title, and interest in and to Our Content remains with us at
          all times. We grant you a limited license to access and use Our
          Content as provided under Section 6 below, and we reserve all other
          rights.
        </Text>
        &nbsp;
        <Text fontWeight="500">
          4. INAPPROPRIATE CONTENT AND MISCONDUCT; REPORTING
        </Text>
        &nbsp;
        <Text>
          ProSocial does not tolerate inappropriate content or behavior on our
          Services. We are committed to maintaining a positive and respectful
          ProSocial community, and we do not tolerate any inappropriate content
          or misconduct, whether on or off of the Services (including, but not
          limited to, on services operated by our affiliates). We encourage you
          to report any inappropriate Member Content or misconduct by other
          users. You may email ProSocial Customer Service by emailing
          prosocialapplication@gmail.com.
        </Text>
        &nbsp;
        <Text>
          As set forth in our Privacy Policy, we may share data between our
          affiliates for the safety and security of our users and may take
          necessary actions if we believe you have violated these Terms,
          including banning you from our Services and/or our affiliates’
          services), and/or preventing you from creating new accounts. You
          understand and agree that we may not share information with you
          regarding your account if doing so would potentially impair the safety
          or privacy of our other users.
        </Text>
        &nbsp;
        <Text>
          Member Content is subject to the terms and conditions of Sections
          512(c) and/or 512(d) of the Digital Millennium Copyright Act 1998. To
          submit a complaint regarding Member Content that may constitute
          intellectual property infringement, see Section 12 (Digital Millennium
          Copyright Act) below.
        </Text>
        &nbsp;
        <Text fontWeight="500">5. PRIVACY</Text>
        &nbsp;
        <Text>
          Privacy is a critical value of ProSocial. We have a separate policy
          about it that you should read.
        </Text>
        &nbsp;
        <Text>
          For information about how ProSocial collects, uses, and shares your
          personal data, please read our Privacy Policy. By using our Services,
          you agree that we may use your personal data in accordance with our
          Privacy Policy.
        </Text>
        &nbsp;
        <Text fontWeight="500">6. RIGHTS YOU ARE GRANTED BY PROSOCIAL</Text>
        &nbsp;
        <Text>
          ProSocial grants you the right to use and enjoy our Services, subject
          to these Terms. For as long as you comply with these Terms, ProSocial
          grants you a personal, worldwide, royalty-free, non-assignable,
          non-exclusive, revocable, and non-sublicensable license to access and
          use our Services for purposes as intended by ProSocial and permitted
          by these Terms and applicable laws. This license and any authorization
          to access the Service are automatically revoked in the event that you
          fail to comply with these Terms.
        </Text>
        &nbsp;
        <Text fontWeight="500">7. RIGHTS YOU GRANT PROSOCIAL</Text>
        &nbsp;
        <Text>
          You own all of the content you provide to ProSocial, but you also
          grant us the right to use Your Content as provided in this Agreement.
        </Text>
        &nbsp;
        <Text>
          By creating an account, you grant to ProSocial a worldwide, perpetual,
          transferable, sub-licensable, royalty-free right and license to host,
          store, use, copy, display, reproduce, adapt, edit, publish, translate,
          modify, reformat, incorporate into other works, advertise, distribute
          and otherwise make available to the general public Your Content,
          including any information you authorize us to access from Facebook or
          other third-party sources (if applicable), in whole or in part, and in
          any way and in any format or medium currently known or developed in
          the future. ProSocial’s license to Your Content shall be
          non-exclusive, except that ProSocial’s license shall be exclusive with
          respect to derivative works created through use of our Services. For
          example, ProSocial would have an exclusive license to screenshots of
          our Services that include Your Content. In addition, so that ProSocial
          can prevent the use of Your Content outside of our Services, you
          authorize ProSocial to act on your behalf with respect to infringing
          uses of Your Content taken from our Services by other users or third
          parties. This expressly includes the authority, but not the
          obligation, to send notices pursuant to 17 U.S.C. § 512(c)(3) (i.e.,
          DMCA Takedown Notices) on your behalf if Your Content is taken and
          used by third parties outside of our Services. ProSocial is not
          obligated to take any action with regard to use of Your Content by
          other users or third parties. ProSocial’s license to Your Content is
          subject to your rights under applicable law (for example, laws
          regarding personal data protection to the extent the content contains
          personal information as defined by those laws).
        </Text>
        &nbsp;
        <Text>
          In consideration for ProSocial allowing you to use our Services, you
          agree that we, our affiliates, and our third-party partners may place
          advertising on our Services. By submitting suggestions or feedback to
          ProSocial regarding our Services, you agree that ProSocial may use and
          share such feedback for any purpose without compensating you. You
          agree that ProSocial may access, preserve, and disclose your account
          information, including Your Content, if required to do so by law or
          upon a good faith belief that such access, preservation, or disclosure
          is reasonably necessary to: (i) comply with legal process; (ii)
          enforce these Terms; (iii) respond to claims that any content violates
          the rights of third parties; (iv) respond to your requests for
          customer service; or (v) protect the rights, property or personal
          safety of the Company or any other person.
        </Text>
        &nbsp;
        <Text fontWeight="500">
          8. PURCHASES AND AUTOMATICALLY RENEWING SUBSCRIPTIONS
        </Text>
        &nbsp;
        <Text>
          You will have the opportunity to purchase products and services from
          ProSocial. If you purchase a subscription, it will automatically
          renew—and you will be charged—until you cancel.
        </Text>
        &nbsp;
        <Text>
          ProSocial may offer products and services for purchase through iTunes,
          Google Play or other external services authorized by ProSocial (each,
          an &quot;External Service,&quot; and any purchases made thereon, an
          &quot;External Service Purchase&quot;). ProSocial may also offer
          products and services for purchase via credit card or other payment
          processors on the Website or inside the App (&quot;Internal
          Purchases&quot;). If you purchase a subscription, it will
          automatically renew until you cancel, in accordance with the terms
          disclosed to you at the time of purchase, as further described below.
          If you cancel your subscription, you will continue to have access to
          your subscription benefits until the end of your subscription period,
          at which point it will expire.
        </Text>
        &nbsp;
        <Text>
          Because our Services may be utilized without a subscription, canceling
          your subscription does not remove your profile from our Services. If
          you wish to fully terminate your membership, you must terminate your
          membership as set forth in Section 9.
        </Text>
        &nbsp;
        <Text>
          ProSocial’s pricing varies by a number of factors. We frequently offer
          promotional rates - which can vary based on region, length of
          subscription, bundle size and more. We also regularly test new
          features and payment options.
        </Text>
        &nbsp;
        <Text fontWeight="500">
          8A. EXTERNAL SERVICE PURCHASES AND SUBSCRIPTIONS
        </Text>
        &nbsp;
        <Text>
          External Service Purchases, including subscriptions, may be processed
          through the External Service, in which case those purchases must be
          managed through your External Service Account. Subscriptions
          automatically renew until you cancel. When making a purchase on the
          Service, you may have the option to pay through an External Service,
          such as with your Apple ID or Google Play account (&quot;your External
          Service Account&quot;), and your External Service Account will be
          charged for the purchase in accordance with the terms disclosed to you
          at the time of purchase and the general terms applicable to your
          External Service Account. Some External Services may charge you sales
          tax, depending on where you live, which may change from time to time.
          If your External Service Purchase includes an automatically renewing
          subscription, your External Service Account will continue to be
          periodically charged for the subscription until you cancel. After your
          initial subscription commitment period, and again after any subsequent
          subscription period, the subscription will automatically continue for
          the price and time period you agreed to when subscribing. To cancel a
          subscription: If you do not want your subscription to renew
          automatically, or if you want to change or terminate your
          subscription, you must log in to your External Service Account and
          follow instructions to manage or cancel your subscription, even if you
          have otherwise deleted your account with us or if you have deleted the
          App from your device. For example, if you subscribed using your Apple
          ID, cancellation is handled by Apple, not ProSocial. To cancel a
          purchase made with your Apple ID, go to Settings &gt; iTunes &amp; App
          Stores &gt; [click on your Apple ID] &gt; View Apple ID &gt;
          Subscriptions, then find your ProSocial subscription and follow the
          instructions to cancel. You can also request assistance at
          https://getsupport.apple.com. Similarly, if you subscribed on Google
          Play, cancellation is handled by Google. To cancel a purchase made
          through Google Play, launch the Google Play app on your mobile device
          and go to Menu &gt; My Apps &gt; Subscriptions, then find your
          ProSocial subscription and follow the instructions to cancel. You can
          also request assistance at https://play.google.com. If you cancel a
          subscription, you may continue to use the cancelled service until the
          end of your then-current subscription term. The subscription will not
          be renewed when your then-current term expires. If you initiate a
          chargeback or otherwise reverse a payment made with your External
          Service Account, ProSocial may terminate your account immediately in
          its sole discretion, on the basis that you have determined that you do
          not want a ProSocial subscription. In the event that your chargeback
          or other payment reversal is overturned, please contact Customer Care.
          ProSocial will retain all funds charged to your External Service
          Account until you cancel your subscription through your External
          Service Account. Certain users may be entitled to request a refund.
          See Section 8d below for more information.
        </Text>
        &nbsp;
        <Text fontWeight="500">8B. INTERNAL PURCHASES AND SUBSCRIPTIONS</Text>
        &nbsp;
        <Text>
          Internal Purchases, including subscriptions, are processed using the
          Payment Method you provide on the Website or App. Subscriptions
          automatically renew until you cancel. If you make an Internal
          Purchase, you agree to pay the prices displayed to you for the
          Services you’ve selected as well as any sales or similar taxes that
          may be imposed on your payments (and as may change from time to time),
          and you authorize ProSocial to charge the payment method you provide
          (your &quot;Payment Method&quot;). ProSocial may correct any billing
          errors or mistakes even if we have already requested or received
          payment. If you initiate a chargeback or otherwise reverse a payment
          made with your Payment Method, ProSocial may terminate your account
          immediately in its sole discretion, on the basis that you have
          determined that you do not want a ProSocial subscription. In the event
          that your chargeback or other payment reversal is overturned, please
          contact Customer Care. If your Internal Purchase includes an
          automatically renewing subscription, your Payment Method will continue
          to be periodically charged for the subscription until you cancel.
          After your initial subscription commitment period, and again after any
          subsequent subscription period, your subscription will automatically
          continue for the price and time period you agreed to when subscribing,
          until you cancel. To cancel a subscription, log in to the Website or
          App and go to the Settings tool. If you cancel a subscription, you may
          continue to use the cancelled service until the end of your
          then-current subscription term. The subscription will not be renewed
          when your then-current term expires. You may edit your Payment Method
          information by using the Settings tool. If a payment is not
          successfully processed, due to expiration, insufficient funds, or
          otherwise, you remain responsible for any uncollected amounts and
          authorize us to continue billing the Payment Method, as it may be
          updated. This may result in a change to your payment billing dates. In
          addition, you authorize us to obtain updated or replacement expiration
          dates and card numbers for your credit or debit card as provided by
          your credit or debit card issuer. The terms of your payment will be
          based on your Payment Method and may be determined by agreements
          between you and the financial institution, credit card issuer, or
          other provider of your chosen Payment Method. Certain users may be
          entitled to request a refund. See Section 8d below for more
          information.
        </Text>
        &nbsp;
        <Text fontWeight="500">8C. VIRTUAL ITEMS</Text>
        &nbsp;
        <Text>
          Virtual items are non-refundable and subject to certain conditions.
        </Text>
        &nbsp;
        <Text>
          From time to time, you may have the opportunity to purchase a limited,
          personal, non-transferable, non-sublicensable, revocable license to
          use or access special limited-use features (&quot;Virtual
          Item(s)&quot;) from ProSocial. You may only purchase Virtual Items
          from us or our authorized partners through our Services. Virtual Items
          represent a limited license right governed by this Agreement, and,
          except as otherwise prohibited by applicable law, no title or
          ownership in or to Virtual Items is being transferred or assigned to
          you. This Agreement should not be construed as a sale of any rights in
          Virtual Items. Any Virtual Item balance shown in your account does not
          constitute a real-world balance or reflect any stored value, but
          instead constitutes a measurement of the extent of your license.
          Virtual Items do not incur fees for non-use; however, the license
          granted to you in Virtual Items will terminate in accordance with the
          terms of this Agreement, on the earlier of when ProSocial ceases
          providing our Services, or your account is otherwise closed or
          terminated. ProSocial, in its sole discretion, reserves the right to
          charge fees for the right to access or use Virtual Items and/or may
          distribute Virtual Items with or without charge. ProSocial may manage,
          regulate, control, modify, or eliminate Virtual Items at any time,
          including taking actions that may impact the perceived value or
          purchase price, if applicable, of any Virtual Items. ProSocial shall
          have no liability to you or any third party in the event that
          ProSocial exercises any such rights. The transfer of Virtual Items is
          prohibited, and you shall not sell, redeem, or otherwise transfer
          Virtual Items to any person or entity. Virtual Items may only be
          redeemed through our Services.
        </Text>
        &nbsp;
        <Text>
          ALL PURCHASES AND REDEMPTIONS OF VIRTUAL ITEMS MADE THROUGH OUR
          SERVICES ARE FINAL AND NON- REFUNDABLE. YOU ACKNOWLEDGE THAT PROSOCIAL
          IS NOT REQUIRED TO PROVIDE A REFUND FOR ANY REASON, AND THAT YOU WILL
          NOT RECEIVE MONEY OR OTHER COMPENSATION FOR UNUSED VIRTUAL ITEMS WHEN
          AN ACCOUNT IS CLOSED, WHETHER SUCH CLOSURE WAS VOLUNTARY OR
          INVOLUNTARY.
        </Text>
        &nbsp;
        <Text fontWeight="500">8D. REFUNDS</Text>
        &nbsp;
        <Text>
          Generally, all purchases are nonrefundable. Special terms apply in
          Arizona, California, Colorado, Connecticut, Illinois, Iowa, Minnesota,
          New York, North Carolina, Ohio, Rhode Island, and Wisconsin.
          Generally, all purchases are final and nonrefundable, and there are no
          refunds or credits for partially used periods, except if the laws
          applicable in your jurisdiction provide for refunds.
        </Text>
        &nbsp;
        <Text>
          For subscribers residing in Arizona, California, Colorado,
          Connecticut, Illinois, Iowa, Minnesota, New York, North Carolina,
          Ohio, Rhode Island, and Wisconsin: Your Right to Cancel—You may cancel
          your subscription, without penalty or obligation, at any time prior to
          midnight of the third business day following the date you subscribed.
          In the event that you die before the end of your subscription period,
          your estate shall be entitled to a refund of that portion of any
          payment you had made for your subscription which is allocable to the
          period after your death. In the event that you become disabled (such
          that you are unable to use our Services) before the end of your
          subscription period, you shall be entitled to a refund of that portion
          of any payment you had made for your subscription which is allocable
          to the period after your disability by providing the Company notice in
          the same manner as you request a refund as described below. Purchases
          of Virtual Items are FINAL AND NON-REFUNDABLE.
        </Text>
        &nbsp;
        <Text>
          If any of the above apply to you and you subscribed using your Apple
          ID, your refund requests are handled by Apple, not ProSocial. To
          request a refund, please contact your External Service directly; for
          example using your Apple device, go to Settings &gt; iTunes &amp; App
          Stores &gt; [click on your Apple ID] &gt; View Apple ID &gt; Purchase
          History. Find the transaction and select &quot;Report a Problem.&quot;
          You can also request a refund at https://getsupport.apple.com. For any
          other purchase, please contact ProSocial Customer Service with your
          order number (see your confirmation email) by mailing or delivering a
          signed and dated notice which states that you, the buyer, are
          canceling this Agreement, or words of similar effect. Please also
          include the email address or telephone number associated with your
          account along with your order number. This notice shall be sent to:
          ProSocial (prosocialapplication@gmail.com).
        </Text>
        &nbsp;
        <Text fontWeight="500">9. ACCOUNT TERMINATION</Text>
        &nbsp;
        <Text>
          You can delete your account at any time by logging into the Website or
          App, going to &quot;Settings&quot; (the gear/pencil icon in the top
          right corner), and following the instructions to cancel your
          membership. However, you will need to cancel / manage any External
          Service Purchases through your External Service Account (e.g., iTunes,
          Google Play) to avoid additional billing. ProSocial reserves the right
          to investigate and, if appropriate, suspend or terminate your account
          without a refund if ProSocial believes that you have violated these
          Terms, misused our Services, or behaved in a way that ProSocial
          regards as inappropriate or unlawful, on or off our Services. We
          reserve the right to make use of any personal, technological, legal,
          or other means available to enforce the Terms, at any time without
          liability and without the obligation to give you prior notice,
          including, but not limited to, preventing you from accessing the
          Services. If your account is terminated by you or by ProSocial for any
          reason, these Terms continue and remain enforceable between you and
          ProSocial, and you will not be entitled to any refund for purchases
          made. Your information will be maintained and deleted in accordance
          with our Privacy Policy.
        </Text>
        &nbsp;
        <Text fontWeight="500">
          10. NO CRIMINAL BACKGROUND OR IDENTITY VERIFICATION CHECKS
        </Text>
        &nbsp;
        <Text>
          ProSocial does not conduct criminal background or identity
          verification checks on its users. Use your best judgment when
          interacting with others and review our Safety Tips.
        </Text>
        &nbsp;
        <Text>
          YOU UNDERSTAND THAT PROSOCIAL DOES NOT CONDUCT CRIMINAL BACKGROUND OR
          IDENTITY VERIFICATION CHECKS ON ITS USERS OR OTHERWISE INQUIRE INTO
          THE BACKGROUND OF ITS USERS. PROSOCIAL MAKES NO REPRESENTATIONS OR
          WARRANTIES AS TO THE CONDUCT, IDENTITY, INTENTIONS, LEGITIMACY, OR
          VERACITY OF USERS. PROSOCIAL RESERVES THE RIGHT TO CONDUCT—AND YOU
          AUTHORIZE PROSOCIAL TO CONDUCT—ANY CRIMINAL BACKGROUND CHECK OR OTHER
          SCREENINGS (SUCH AS SEX OFFENDER REGISTER SEARCHES) AT ANY TIME USING
          AVAILABLE PUBLIC RECORDS, AND YOU AGREE THAT ANY INFORMATION YOU
          PROVIDE MAY BE USED FOR THAT PURPOSE. IF THE COMPANY DECIDES TO
          CONDUCT ANY SCREENING THROUGH A CONSUMER REPORTING AGENCY, YOU HEREBY
          AUTHORIZE THE COMPANY TO OBTAIN AND USE A CONSUMER REPORT ABOUT YOU TO
          DETERMINE YOUR ELIGIBILITY UNDER THESE TERMS.
        </Text>
        &nbsp;
        <Text>
          YOU ARE SOLELY RESPONSIBLE FOR YOUR INTERACTIONS WITH OTHER USERS
          USING THE APP AND IN PERSON. SEX OFFENDER SCREENINGS AND OTHER TOOLS
          DO NOT GUARANTEE YOUR SAFETY AND ARE NOT A SUBSTITUTE FOR FOLLOWING
          THE SAFETY TIPS AND OTHER SENSIBLE SAFETY PRECAUTIONS. ALWAYS USE YOUR
          BEST JUDGMENT AND TAKE APPROPRIATE SAFETY PRECAUTIONS WHEN
          COMMUNICATING WITH OR MEETING NEW PEOPLE. COMMUNICATIONS RECEIVED
          THROUGH THE SERVICE, INCLUDING AUTOMATIC NOTIFICATIONS SENT BY
          PROSOCIAL, MAY RESULT FROM USERS ENGAGING WITH THE SERVICE FOR
          IMPROPER PURPOSES, INCLUDING FRAUD, ABUSE, HARASSMENT, OR OTHER SUCH
          IMPROPER BEHAVIOR.
        </Text>
        &nbsp;
        <Text>
          Though ProSocial strives to encourage a respectful user experience, it
          is not responsible for the conduct of any user on or off the Service.
          You agree to use caution in all interactions with other users,
          particularly if you decide to communicate off the Service or meet in
          person.
        </Text>
        &nbsp;
        <Text fontWeight="500">11. DISCLAIMER</Text>
        &nbsp;
        <Text>
          ProSocial’s Services are provided &quot;as is&quot; and we do not
          make, and cannot make, any representations about the content or
          features of our Services.
        </Text>
        &nbsp;
        <Text>
          PROSOCIAL PROVIDES OUR SERVICES ON AN &quot;AS IS&quot; AND &quot;AS
          AVAILABLE&quot; BASIS AND TO THE EXTENT PERMITTED BY APPLICABLE LAW,
          GRANTS NO WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY
          OR OTHERWISE WITH RESPECT TO OUR SERVICES (INCLUDING ALL CONTENT
          CONTAINED THEREIN), INCLUDING, WITHOUT LIMITATION, ANY IMPLIED
          WARRANTIES OF SATISFACTORY QUALITY, MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE OR NON-INFRINGEMENT. PROSOCIAL DOES NOT REPRESENT
          OR WARRANT THAT (A) OUR SERVICES WILL BE UNINTERRUPTED, SECURE, OR
          ERROR FREE, (B) ANY DEFECTS OR ERRORS IN OUR SERVICES WILL BE
          DISCOVERED OR CORRECTED, OR (C) THAT ANY CONTENT OR INFORMATION YOU
          OBTAIN ON OR THROUGH OUR SERVICES WILL BE ACCURATE OR APPROPRIATE FOR
          YOUR PURPOSES. FURTHERMORE, PROSOCIAL MAKES NO GUARANTEES AS TO THE
          NUMBER OF ACTIVE USERS AT ANY TIME; USERS’ ABILITY OR DESIRE TO
          COMMUNICATE WITH OR MEET YOU, OR THE ULTIMATE COMPATIBILITY WITH OR
          CONDUCT BY USERS YOU MEET THROUGH THE SERVICES. PROSOCIAL ASSUMES NO
          RESPONSIBILITY FOR ANY CONTENT THAT YOU OR ANOTHER USER OR THIRD PARTY
          POSTS, SENDS, OR RECEIVES; NOR DOES PROSOCIAL ASSUME ANY
          RESPONSIBILITY FOR THE IDENTITY, INTENTIONS, LEGITIMACY, OR VERACITY
          OF ANY USERS WITH WHOM YOU MAY COMMUNICATE WITH THROUGH PROSOCIAL. ANY
          MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF OUR
          SERVICES IS ACCESSED AT YOUR OWN DISCRETION AND RISK. PROSOCIAL IS NOT
          RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER HARDWARE, COMPUTER
          SOFTWARE, OR OTHER EQUIPMENT OR TECHNOLOGY INCLUDING, BUT WITHOUT
          LIMITATION, DAMAGE FROM ANY SECURITY BREACH OR FROM ANY VIRUS, BUGS,
          TAMPERING, HACKING, FRAUD, ERROR, OMISSION, INTERRUPTION, DEFECT,
          DELAY IN OPERATION OR TRANSMISSION, COMPUTER LINE OR NETWORK FAILURE,
          OR ANY OTHER TECHNICAL OR OTHER DISRUPTION OR MALFUNCTION.
        </Text>
        &nbsp;
        <Text fontWeight="500">12. DIGITAL MILLENNIUM COPYRIGHT ACT</Text>
        &nbsp;
        <Text>
          We take copyright infringement very seriously. We ask you to help us
          to ensure we address it promptly and effectively.
        </Text>
        &nbsp;
        <Text>
          ProSocial has adopted the following policy towards copyright
          infringement in accordance with the Digital Millennium Copyright Act
          (the &quot;DMCA&quot;). If you believe any Member Content or Our
          Content infringes upon your intellectual property rights, please
          submit a notification alleging such infringement (&quot;DMCA Takedown
          Notice&quot;) including the following:
        </Text>
        &nbsp;
        <Text>
          1. A physical or electronic signature of a person authorized to act on
          behalf of the owner of an exclusive right that is allegedly infringed;
        </Text>
        &nbsp;
        <Text>
          2. Identification of the copyrighted work claimed to have been
          infringed, or, if multiple copyrighted works at a single online site
          are covered by a single notification, a representative list of such
          works;
        </Text>
        &nbsp;
        <Text>
          3. Identification of the material claimed to be infringing or to be
          the subject of infringing activity and that is to be removed or access
          disabled and information reasonably sufficient to permit the service
          provider to locate the material;
        </Text>
        &nbsp;
        <Text>
          4. Information reasonably sufficient to permit the service provider to
          contact you, such as an address, telephone number, and, if available,
          an electronic mail;
        </Text>
        &nbsp;
        <Text>
          5. A statement that you have a good faith belief that use of the
          material in the manner complained of is not authorized by the
          copyright owner, its agent, or the law; and
        </Text>
        &nbsp;
        <Text>
          6. A statement that, under penalty of perjury, the information in the
          notification is accurate and you are authorized to act on behalf of
          the owner of the exclusive right that is allegedly infringed.
        </Text>
        &nbsp;
        <Text>
          Any DMCA Takedown Notices should be sent to copyright@ProSocial.com,
          by email to the following address:
          <a href="mailto:prosocialapplications@gmail.com">
            <span className="Hyperlink">prosocialapplication@gmail.com</span>
          </a>
          . ProSocial will terminate the accounts of repeat infringers.
        </Text>
        &nbsp;
        <Text fontWeight="500">13. ADS AND THIRD-PARTY CONTENT</Text>
        &nbsp;
        <Text>
          Like many subscription-based services, there are ads on our websites.
          Our Services may contain advertisements and promotions offered by
          third parties and links to other websites or resources. ProSocial may
          also provide non-commercial links or references to third parties
          within its content. ProSocial is not responsible for the availability
          (or lack of availability) of any external websites or resources or
          their content. Furthermore, ProSocial is not responsible for, and does
          not endorse, any products or services that may be offered by
          third-party websites or resources. If you choose to interact with the
          third parties made available through our Services, such party’s terms
          will govern their relationship with you. ProSocial is not responsible
          or liable for such third parties’ terms or actions.
        </Text>
        &nbsp;
        <Text fontWeight="500">14. LIMITATION OF LIABILITY</Text>
        &nbsp;
        <Text>
          ProSocial’s liability is limited to the maximum extent allowed by
          applicable law. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN
          NO EVENT WILL PROSOCIAL, ITS AFFILIATES, EMPLOYEES, LICENSORS, OR
          SERVICE PROVIDERS BE LIABLE FOR ANY INDIRECT, CONSEQUENTIAL,
          EXEMPLARY, INCIDENTAL, SPECIAL, PUNITIVE, FIXED, OR ENHANCED DAMAGES,
          INCLUDING, WITHOUT LIMITATION, LOSS OF PROFITS, WHETHER INCURRED
          DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER
          INTANGIBLE LOSSES, RESULTING FROM: (I) YOUR ACCESS TO OR USE OF OR
          INABILITY TO ACCESS OR USE THE SERVICES, (II) THE CONDUCT OR CONTENT
          OF ANY USERS OR THIRD PARTIES ON OR THROUGH ANY OF OUR AFFILIATES’
          SERVICES OR IN CONNECTION WITH THE SERVICES; OR (III) ANY UNAUTHORIZED
          ACCESS, USE, OR ALTERATION OF YOUR CONTENT, EVEN IF PROSOCIAL HAS BEEN
          ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </Text>
        &nbsp;
        <Text>
          TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL
          PROSOCIAL’S AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS RELATING TO THE
          SERVICES EXCEED THE AMOUNT PAID, IF ANY, BY YOU TO PROSOCIAL FOR THE
          SERVICES DURING THE TWELVE (12) MONTH PERIOD IMMEDIATELY PRECEDING THE
          DATE THAT YOU FIRST FILE A LAWSUIT, ARBITRATION OR ANY OTHER LEGAL
          PROCEEDING AGAINST PROSOCIAL, WHETHER STATUTORY, IN LAW OR IN EQUITY,
          IN ANY TRIBUNAL. THE DAMAGES LIMITATION SET FORTH IN THE IMMEDIATELY
          PRECEDING SENTENCE APPLIES (I) REGARDLESS OF THE GROUND UPON WHICH
          LIABILITY IS BASED (WHETHER DEFAULT, CONTRACT, TORT, STATUTE, OR
          OTHERWISE), (II) IRRESPECTIVE OF THE TYPE OF BREACH OF RIGHTS,
          PRIVILEGES, OR OBLIGATIONS, AND (III) WITH RESPECT TO ALL EVENTS, THE
          SERVICE, AND THIS AGREEMENT. THE LIMITATION OF LIABILITY PROVISIONS
          SET FORTH IN THIS SECTION 14 SHALL APPLY EVEN IF YOUR REMEDIES UNDER
          THIS AGREEMENT FAIL WITH RESPECT TO THEIR ESSENTIAL PURPOSE. SOME
          JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN
          DAMAGES, SO SOME OR ALL OF THE EXCLUSIONS AND LIMITATIONS IN THIS
          SECTION MAY NOT APPLY TO YOU.
        </Text>
        &nbsp;
        <Text fontWeight="500">15. DISPUTE RESOLUTION SECTION</Text>
        &nbsp;
        <Text>
          In the unlikely event that we have a legal dispute, here is how the
          Parties agree to proceed, except where prohibited by applicable law.
          Any Subsection in this Dispute Resolution Section that is prohibited
          by law shall not apply to the users residing in that jurisdiction.
        </Text>
        &nbsp;
        <Text fontWeight="500">15A. INFORMAL DISPUTE RESOLUTION PROCESS</Text>
        &nbsp;
        <Text>
          If you are dissatisfied with our Services for any reason, please
          contact ProSocial Customer Service first so we can try to resolve your
          concerns without the need of outside assistance. If you choose to
          pursue a dispute, claim or controversy against ProSocial, these terms
          will apply. For purposes of this Dispute Resolution Process and
          Arbitration Procedures set forth in Section 15, &quot;ProSocial&quot;
          shall include our affiliates, employees, licensors, and service
          providers. ProSocial values its relationship with you and appreciates
          the mutual benefit realized from informally resolving Disputes (as
          defined below). Before formally pursuing a Dispute in arbitration or
          small claims court, you agree to first send a detailed notice
          (&quot;Notice&quot;) to ProSocial. If ProSocial has a Dispute with
          you, ProSocial agrees to first send a Notice to you at your most
          recent email address on file with us, or if no email address is on
          file, other contact information associated with your account. Your
          Notice must contain all of the following information: (1) your full
          name; (2) information that enables ProSocial to identify your account,
          your address, mobile phone number, email address, and date of birth
          you used to register your account if any; and (3) a detailed
          description of your Dispute, including the nature and factual basis of
          your claim(s) and the relief you are seeking with a corresponding
          calculation of your alleged damages (if any). You must personally sign
          this Notice for it to be effective. ProSocial’s Notice must likewise
          set forth a detailed description of its Dispute, which shall include
          the nature and factual basis of its claim(s) and the relief it is
          seeking, with a corresponding calculation of our damages (if any). You
          and ProSocial agree to then negotiate in good faith in an effort to
          resolve the Dispute. As part of these good faith negotiations, if
          ProSocial requests a telephone conference with you to discuss your
          Dispute, you agree to personally participate, with your attorney if
          you’re represented by counsel. Likewise, if you request a telephone
          conference to discuss ProSocial’s Dispute with you, ProSocial agrees
          to have one representative participate. This informal process should
          lead to a resolution of the Dispute. However, if the Dispute is not
          resolved within 60 days after receipt of a fully completed Notice and
          the Parties have not otherwise mutually agreed to an extension of this
          informal dispute resolution time period, you or ProSocial may initiate
          an arbitration (subject to a Party’s right to elect small claims court
          as provided below). Completion of this informal dispute resolution is
          a condition precedent to filing any demand for arbitration or small
          claims court action. Failure to do so is a breach of this Agreement.
          The statute of limitations and any filing fee deadlines will be tolled
          while you and ProSocial engage in this informal dispute resolution
          process. Unless prohibited by applicable law, the arbitration
          provider, National Arbitration and Mediation (&quot;NAM&quot;), shall
          not accept or administer any demand for arbitration and shall
          administratively close any arbitration unless the Party bringing such
          demand for arbitration can certify in writing that the terms and
          conditions of this informal dispute resolution process were fully
          satisfied. A court of competent jurisdiction shall have authority to
          enforce this provision and to enjoin any arbitration proceeding or
          small claims court action.
        </Text>
        &nbsp;
        <Text fontWeight="500">
          15B. INDIVIDUAL RELIEF: CLASS ACTION AND JURY TRIAL WAIVER
        </Text>
        &nbsp;
        <Text>
          TO THE FULLEST EXTENT ALLOWABLE BY LAW, YOU AND PROSOCIAL EACH WAIVE
          THE RIGHT TO A JURY TRIAL AND THE RIGHT TO LITIGATE DISPUTES IN COURT
          IN FAVOR OF INDIVIDUAL ARBITRATION (EXCEPT FOR SMALL CLAIMS COURT AS
          PROVIDED ABOVE). YOU AND PROSOCIAL EACH WAIVE THE RIGHT TO FILE OR
          PARTICIPATE IN A CLASS ACTION AGAINST THE OTHER OR OTHERWISE TO SEEK
          RELIEF ON A CLASS BASIS, INCLUDING ANY CURRENTLY PENDING ACTIONS
          AGAINST PROSOCIAL. TO THE FULLEST EXTENT ALLOWABLE BY LAW, THERE SHALL
          BE NO RIGHT OR AUTHORITY FOR ANY CLAIMS TO BE ARBITRATED OR LITIGATED
          ON A CLASS, COLLECTIVE, REPRESENTATIVE, CONSOLIDATED, OR PRIVATE
          ATTORNEY GENERAL BASIS. THE ARBITRATOR CAN AWARD THE SAME RELIEF
          AVAILABLE IN COURT PROVIDED THAT THE ARBITRATOR MAY ONLY AWARD FINAL
          RELIEF (INCLUDING INJUNCTIVE OR DECLARATORY RELIEF) IN FAVOR OF THE
          INDIVIDUAL PARTY SEEKING RELIEF AND ONLY TO THE EXTENT NECESSARY TO
          PROVIDE FINAL RELIEF WARRANTED BY THAT INDIVIDUAL PARTY’S CLAIM. THE
          ARBITRATOR MAY NOT AWARD FINAL RELIEF FOR, AGAINST, OR ON BEHALF OF
          ANYONE WHO IS NOT A PARTY TO THE ARBITRATION ON A CLASS, COLLECTIVE,
          REPRESENTATIVE, OR PRIVATE ATTORNEY GENERAL BASIS. IF A COURT
          DETERMINES THAT ANY OF THESE PROHIBITIONS IN THIS PARAGRAPH ARE
          UNENFORCEABLE AS TO A PARTICULAR CLAIM OR REQUEST FOR RELIEF (SUCH AS
          A REQUEST FOR PUBLIC INJUNCTIVE RELIEF), AND ALL APPEALS OF THAT
          DECISION ARE EXHAUSTED OR THE DECISION IS OTHERWISE FINAL, THEN YOU
          AND PROSOCIAL AGREE THAT THAT PARTICULAR CLAIM OR REQUEST FOR RELIEF
          SHALL PROCEED IN COURT BUT SHALL BE STAYED PENDING INDIVIDUAL
          ARBITRATION OF THE REMAINING CLAIMS FOR RELIEF THAT YOU HAVE BROUGHT.
          IF THIS SPECIFIC PARAGRAPH IS FOUND TO BE UNENFORCEABLE, THEN THE
          ENTIRETY OF THIS ARBITRATION PROVISION (EXCEPT FOR THE JURY TRIAL
          WAIVER AND THE INFORMAL DISPUTE RESOLUTION PROCESS) SHALL BE NULL AND
          VOID. THIS PARAGRAPH IS AN ESSENTIAL PART OF THIS ARBITRATION
          AGREEMENT.
        </Text>
        &nbsp;
        <Text fontWeight="500">
          15C. DISPUTE RESOLUTION THROUGH ARBITRATION OR SMALL CLAIMS COURT
        </Text>
        &nbsp;
        <Text>
          Any dispute, claim, or controversy between you and ProSocial (that is
          not resolved informally by ProSocial Customer Service or as provided
          under subsection 15a above) that arises from or relates in any way to
          this Agreement (including any alleged breach of this Agreement), the
          Services, or our relationship with you (collectively,
          &quot;Dispute&quot;), shall be exclusively resolved through BINDING
          INDIVIDUAL ARBITRATION except as specifically provided otherwise in
          this Dispute Resolution Section. &quot;Dispute&quot; as used in this
          Agreement shall have the broadest possible meaning and include claims
          that arose before the existence of this or any prior Agreement and
          claims that arise during the term of this Agreement or after the
          termination of this Agreement. Notwithstanding the foregoing, either
          you or ProSocial may elect to have an individual claim heard in small
          claims court. If the request to proceed in small claims court is made
          after an arbitration has been initiated but before an arbitrator has
          been appointed, such arbitration shall be administratively closed. Any
          controversy over the small claims court’s jurisdiction shall be
          determined by the small claims court. All other issues (except as
          otherwise provided herein) are exclusively for the Arbitrator to
          decide, including but not limited to scope and enforceability of this
          Dispute Resolution Section, as well as any request to proceed in small
          claims court that is made after an arbitrator has been appointed. If
          you or ProSocial challenges the small claims court election in your
          Dispute, and a court of competent jurisdiction determines that the
          small claims court election is unenforceable, then such election shall
          be severed from this Agreement as to your Dispute. However, such court
          determination shall not be considered or deemed binding with respect
          to ProSocial’s other contracting parties. Any court proceeding to
          enforce this Dispute Resolution Section 15, including any proceeding
          to confirm, modify, or vacate an arbitration award, must be commenced
          in accordance with Section 17. In the event Dispute Resolution Section
          15 is for any reason held to be unenforceable, any litigation against
          ProSocial (except for small claims court actions) may be commenced
          only in the federal or state courts located in Cook County, Illinois.
          You hereby irrevocably consent to those courts’ exercise of personal
          jurisdiction over you for such purposes and waive any claim that such
          courts constitute an inconvenient forum.
        </Text>
        &nbsp;
        <Text fontWeight="500">
          15D. INDIVIDUAL ARBITRATION AND MASS ARBITRATION PROTOCOLS
        </Text>
        &nbsp;
        <Text>
          This subsection 15d applies to Disputes that are submitted to NAM
          after fully completing the informal Notice and Dispute resolution
          process described in subsection 15a above and when no small claims
          court election is made by either Party. Any arbitration between you
          and ProSocial shall be administered by NAM in accordance with NAM’s
          operative Comprehensive Dispute Resolution Rules and Procedures (the
          &quot;NAM Rules&quot;) in effect at the time any demand for
          arbitration is filed with NAM, as modified by this Dispute Resolution
          Section 15. For a copy of the NAM Rules, please visit
          https://www.namadr.com/resources/rules-fees-forms or contact NAM at
          NAM’s National Processing Center at 990 Stewart Avenue, 1st Floor,
          Garden City, NY 11530 and email address commercial@namadr.com. If NAM
          is unable or unwilling to perform its duties under this Agreement, the
          parties shall mutually agree on an alternative administrator that will
          replace NAM and assume NAM’s role consistent with this Agreement. If
          the parties are unable to agree, they will petition a court of
          competent jurisdiction to appoint an administrator that will assume
          NAM’s duties under this Agreement. The Parties agree that the
          following procedures will apply to any Arbitrations initiated under
          this Dispute Resolution Section:
        </Text>
        &nbsp;
        <Text>
          1. Commencing an Arbitration – To initiate an arbitration, you or
          ProSocial shall send to NAM a demand for arbitration (&quot;Demand for
          Arbitration&quot;) that describes the claim(s) and request for relief
          in detail, consistent with the requirements in this Agreement and NAM
          Rules. If you send a Demand for Arbitration, you shall also send it to
          ProSocial at 16 W. Pickwick Rd., Arlington Heights, IL 60005, within
          10 days of delivery of the Demand for Arbitration to NAM. If ProSocial
          sends a Demand for Arbitration, we will also send it to your mailing
          address on file with us within the same 10-day period. If your mailing
          address is not available, we will send it to your email address on
          file, or if no email address is on file, other contact information
          associated with your account. The arbitration provider shall not
          accept or administer any demand for arbitration and shall
          administratively close any such demand for arbitration that fails to
          certify in writing that the Party meets the requirements of Dispute
          Resolution Section 15 or if either Party elects small claims court as
          set forth above.
        </Text>
        &nbsp;
        <Text>
          2. Fees – The payment of all fees shall be governed by the NAM Rules,
          except to the extent that the case is a part of a Mass Filing (as
          defined below) or the NAM fees and costs (including Arbitrator fees)
          paid by either Party are reallocated upon order of the Arbitrator
          following a determination that (a) either Party breached Section 15 of
          this Agreement, (b) such reallocation is called for under this
          Agreement, or (c) reallocation is otherwise permitted under applicable
          law. Upon a showing to ProSocial of your financial hardship we will
          consider a good faith request made by you to pay your portion of the
          applicable consumer portion of the filing fee. ProSocial is committed
          to ensuring that arbitration costs to consumers do not serve as a
          barrier to the adjudication of disputes. If ProSocial initiates an
          arbitration against you, we shall pay all fees.
        </Text>
        &nbsp;
        <Text>
          3. The Arbitrator – The arbitration shall be conducted by a single,
          neutral (the &quot;Claim Arbitrator&quot;), as assisted by any Process
          Arbitrator appointed under NAM Rules. (The term &quot;Arbitrator&quot;
          applies to both the Claim Arbitrator and the Process Arbitrator). If a
          hearing is elected by either Party, the Arbitrator shall be in or
          close to the location in which you reside. The Arbitrator is bound by
          and shall adhere to this Agreement. In the event NAM Rules conflict
          with this Agreement, the terms of this Agreement shall control. If the
          Arbitrator determines that strict application of any term of Section
          15 of this Agreement (except for the small claims election, which
          shall be determined by the small claims court) would result in a
          fundamentally unfair arbitration (the &quot;Unfair Term&quot;), then
          the Arbitrator shall have authority to modify the Unfair Term to the
          extent necessary to ensure a fundamentally fair arbitration that is
          consistent with the Terms of Use (the &quot;Modified Term&quot;). In
          determining the substance of a Modified Term, the Arbitrator shall
          select a term that comes closest to expressing the intention of the
          Unfair Term.
        </Text>
        &nbsp;
        <Text>
          4. Dispositive Motions – The Parties agree that the Claim Arbitrator
          shall have the authority to consider dispositive motions without an
          oral evidentiary hearing. Dispositive motions may be requested under
          the following circumstances: (a) within 30 days after the Claim
          Arbitrator’s appointment, a Party may request to file a dispositive
          motion based upon the pleadings; and (b) no later than 30 days prior
          to the evidentiary hearing, a Party may request to file a dispositive
          motion for summary judgment based upon the Parties’ pleadings and the
          evidence submitted.
        </Text>
        &nbsp;
        <Text>
          5. Discovery –Each Party may (a) serve up to five requests for
          relevant, non-privileged documents from the other Party; and (b)
          request that the other Party provide verified responses to no more
          than 5 relevant interrogatories (including subparts). Unless both
          Parties agree otherwise, no other forms of discovery (including
          depositions) may be utilized. Any such discovery requests must be
          served on the other Party within 21 days after the Claim Arbitrator’s
          appointment. The responding Party shall provide the requesting Party
          with all responsive, non-privileged documents, responses signed by the
          Party themselves to the requested interrogatories, and/or any
          objections to the requests within 30 days after receipt of the
          requests, or, in the event of an objection to any discovery request,
          30 days after the Claim Arbitrator resolves the dispute. In the event
          either Party requests that the Claim Arbitrator consider a dispositive
          motion on the pleadings, such written discovery response deadlines
          shall be extended until 30 days following the Claim Arbitrator’s final
          decision on such dispositive motion. Any disputes about discovery or
          requests for extensions shall be submitted promptly to the Claim
          Arbitrator for resolution. In ruling on any discovery dispute or
          extension request, the Claim Arbitrator shall take into consideration
          the nature, amount, and scope of the underlying arbitration claim, the
          cost and other effort that would be involved in providing the
          requested discovery, the case schedule, and whether the requested
          discovery is necessary for the adequate preparation of a claim or
          defense.
        </Text>
        &nbsp;
        <Text>
          6. Confidentiality – Upon either Party’s request, the Arbitrator will
          issue an order requiring that confidential information of either Party
          disclosed during the arbitration (whether in documents or orally) may
          not be used or disclosed except in connection with the arbitration or
          a proceeding to enforce the arbitration award and that any permitted
          court filing of confidential information must be done under seal.
        </Text>
        &nbsp;
        <Text>
          7. Arbitration Hearing – You and ProSocial are entitled to a fair
          evidentiary hearing (i.e. trial) before the Claim Arbitrator.
          Arbitration proceedings are usually simpler, less costly, and more
          streamlined than trials and other judicial proceedings. The Parties
          agree to waive all oral hearings and instead submit all disputes to
          the Claim Arbitrator for an award based on written submissions and
          other evidence as the Parties may agree, unless a Party requests an
          oral hearing within 10 days after the Respondent files a response. If
          an oral evidentiary hearing is requested, both Parties must be
          personally present at the hearing, regardless of whether either Party
          has retained counsel. Both Parties must personally attend the hearing.
          Either Party’s failure to personally attend the hearing, without a
          continuance ordered by the Claim Arbitrator for good cause, will
          result in a default judgment taken against that Party.
        </Text>
        &nbsp;
        <Text>
          8. Arbitration Award – Regardless of the format of the arbitration,
          the Claim Arbitrator shall provide a reasoned decision, in writing
          within 30 days after the hearing or, if no hearing is held, within 30
          days after any rebuttal or supplemental statements are due. The
          decision must clearly specify the relief, if any, awarded and contain
          a brief statement of the reasons for the award. The arbitration award
          is binding only between you and ProSocial and will not have any
          preclusive effect in another arbitration or proceeding that involves a
          different Party. The Claim Arbitrator may, however, choose to consider
          rulings from other arbitrations involving a different Party. The
          Arbitrator may award fees and costs as provided by the NAM Rules or to
          the extent such fees and costs could be awarded in court. This
          includes but is not limited to the ability of the Arbitrator to award
          fees and costs if the Arbitrator determines that a claim or defense is
          frivolous or was brought for an improper purpose, for the purpose of
          harassment, or in bad faith.
        </Text>
        &nbsp;
        <Text>
          9. Offer of Settlement – The Respondent may, but is not obligated to,
          make a written settlement offer to the opposing Party any time before
          the evidentiary hearing or, if a dispositive motion is permitted,
          prior to the dispositive motion being granted. The amount or terms of
          any settlement offer may not be disclosed to the Claim Arbitrator
          until after the Claim Arbitrator issues an award on the claim. If the
          award is issued in the opposing Party’s favor and is less than the
          Respondent’s settlement offer or if the award is in the Respondent’s
          favor, the opposing Party must pay the Respondent’s costs incurred
          after the offer was made, including any attorney’s fees. If any
          applicable statute or caselaw prohibits the flipping of costs incurred
          in the arbitration, then the offer in this provision shall serve to
          cease the accumulation of any costs that claimant may be entitled to
          for the cause of action under which it is suing.
        </Text>
        &nbsp;
        <Text>
          10. Mass Filing – If, at any time, 25 or more similar demands for
          arbitration are asserted against ProSocial or related parties by the
          same or coordinated counsel or entities (&quot;Mass Filing&quot;),
          consistent with the definition and criteria of Mass Filings set forth
          in the NAM’s Mass Filing Supplemental Dispute Resolution Rules and
          Procedures (&quot;NAM’s Mass Filing Rules&quot;, available at
          https://www.namadr.com/resources/rules-fees-forms/), the additional
          protocols set forth below shall apply.
        </Text>
        &nbsp;
        <Text>
          i. If you or your counsel file a Demand for Arbitration that fits
          within the definition of Mass Filing referred to above, then you agree
          that your Demand for Arbitration shall be subject to the additional
          protocols set forth in this Mass Filing subsection. You also
          acknowledge that the adjudication of your Dispute might be delayed and
          that any applicable statute of limitations shall be tolled from the
          time at which the first cases are chosen to proceed until your case is
          chosen for a bellwether proceeding.
        </Text>
        &nbsp;
        <Text>
          ii. NAM’s Mass Filing Rules shall apply if your Dispute is deemed by
          NAM, in its sole discretion pursuant to its Rules and this Dispute
          Resolution Section, to be part of a Mass Filing. Such election for
          NAM’s Mass Filing Rules and related fee schedule must be made by
          either you or ProSocial in writing and submitted to NAM and all
          Parties.
        </Text>
        &nbsp;
        <Text>
          iii. Bellwether Proceedings. Bellwether proceedings are encouraged by
          courts and arbitration administrators when there are multiple disputes
          involving similar claims against the same or related parties. Counsel
          for the Mass Filings claimants (including you) and counsel for
          ProSocial shall each select 15 Demands for Arbitration (30 total), and
          no more than 30 arbitrations shall be filed, processed, adjudicated,
          or pending at the same time, with each of the 30 individual
          arbitrations presided over by a different Claim Arbitrator, in a first
          set of bellwether proceedings. During this time, no other Demands for
          arbitration that are part of the Mass Filings may be filed, processed,
          adjudicated, or pending. If the Parties are unable to resolve the
          remaining Demands for Arbitration after the first set of bellwether
          proceedings are arbitrated or otherwise resolved, then counsel for the
          Claimants and counsel for ProSocial shall each select an additional 15
          Demands for Arbitration (30) total to be filed, processed, and
          adjudicated as individual arbitrations, with each of the 30
          arbitrations presided over by a different Claim Arbitrator, in a
          second set of bellwether proceedings. During this time, no other
          Demands for Arbitration that are part of the Mass Filings may be
          filed, processed, or adjudicated. This staged process of bellwether
          proceedings, with each set including 30 Demands for Arbitration
          adjudicated on an individual basis, shall continue until each Demand
          included in the Mass Filings (including your Demand for Arbitration)
          is adjudicated or otherwise resolved. Fees associated with a Demand
          for Arbitration included in the Mass Filings, including fees owed by
          ProSocial and the claimants (including you), shall only be due after
          your Demand for Arbitration is chosen as part of a set of bellwether
          proceedings and therefore properly designated for filing, processing,
          and adjudication. Any applicable statute of limitations shall be
          tolled beginning when you initiate the informal dispute resolution
          process set forth in subsection 15a of the Agreement, and if the first
          Mass Filings’ Demands for Arbitration are chosen for the initial set
          of bellwether proceedings have been filed, your claims will remain
          tolled until your Demand for Arbitration is decided, withdrawn, or is
          settled. A court of competent jurisdiction located in a venue allowed
          under Section 17 of the Agreement shall have the power to enforce this
          subsection.
        </Text>
        &nbsp;
        <Text>
          iv. You and ProSocial agree that we each value the integrity and
          efficiency of the arbitration and small claims court process and wish
          to employ the process for the fair resolution of genuine and sincere
          disputes between us. You and ProSocial acknowledge and agree to act in
          good faith to ensure the fair resolution of genuine and sincere
          Disputes. The Parties further agree that application of these Mass
          Filings procedures have been reasonably designed to result in an
          efficient and fair adjudication of such cases.
        </Text>
        &nbsp;
        <Text fontWeight="500">
          15E. FUTURE CHANGES AND RETROACTIVE APPLICATION
        </Text>
        &nbsp;
        <Text>
          This Dispute Resolution Section 15 applies to all Disputes between the
          Parties, including for any claims that accrued against you or
          ProSocial prior to the time of your consent to this Agreement and to
          any claims that accrue against you or ProSocial after your consent to
          this Agreement. Notwithstanding any provision in this Agreement to the
          contrary, you may elect to opt out of the retroactive application of
          this Dispute Resolution Section 15 as to claims that have accrued
          against you or against ProSocial prior to the time of your consent to
          this Agreement. You may opt out by sending us written notice, within
          30 days of the time you consent to his Agreement, to the following
          email address:
          <a
            href="mailto:prosocialapplications@gmail.com"
            style={{ textDecoration: "none" }}
          >
            <span className="Hyperlink">prosocialapplication@gmail.com</span>
          </a>
          . You must include information sufficient to identify your account(s),
          such as the email address or phone number associated with your
          account(s), and should include a statement that you are opting out of
          the retroactive application of this Dispute Resolution Section 15.
          Please note: if you opt out of the retroactive application of this
          Dispute Resolution Section 15, you will still be subject to and bound
          by any Dispute Resolution Sections and Arbitration Procedures you
          previously agreed to, including any arbitration provisions, class
          action waivers, and retroactive application sections. Also, regardless
          of whether you opt out of the retroactive application of these
          changes, the Parties will resolve any claims that accrue against you
          or ProSocial after your consent to this Agreement in accordance with
          this Dispute Resolution Section.
        </Text>
        &nbsp;
        <Text fontWeight="500">16. GOVERNING LAW</Text>
        &nbsp;
        <Text>
          Illinois law and the Federal Arbitration Act will apply to any Dispute
          (except where prohibited by law). To the fullest extent allowable by
          law, the laws of Illinois, U.S.A., without regard to its conflict of
          laws rules, shall apply to any Dispute arising out of or relating to
          this Agreement or our Services. Notwithstanding the foregoing, the
          Dispute Resolution Process set forth in Section 15 shall be governed
          by the Federal Arbitration Act.
        </Text>
        &nbsp;
        <Text fontWeight="500">17. VENUE/FORUM SELECTION</Text>
        &nbsp;
        <Text>
          To the fullest extent allowable by law, any claims that are not
          arbitrated for any reason must be litigated in Cook County, IL (except
          for claims filed in small claims court).Except where prohibited by law
          and except for claims that are heard in a small claims court as set
          forth in Section 15, any claims arising out of or relating to this
          Agreement, to our Services, or to your relationship with ProSocial
          that for whatever reason are not required to be arbitrated or filed in
          small claims court, will be litigated exclusively in the federal or
          state courts located in Cook County, Illinois, U.S.A. You and
          ProSocial consent to the exercise of personal jurisdiction of courts
          in the State of Illinois and waive any claim that such courts
          constitute an inconvenient forum.
        </Text>
        &nbsp;
        <Text fontWeight="500">18. INDEMNITY BY YOU</Text>
        &nbsp;
        <Text>
          You agree to indemnify ProSocial if a claim is made against ProSocial
          due to your actions. You agree, to the extent permitted under
          applicable law, to indemnify, defend, and hold harmless ProSocial, our
          affiliates, and their and our respective officers, directors, agents,
          and employees from and against any and all complaints, demands,
          claims, damages, losses, costs, liabilities, and expenses, including
          attorney’s fees, due to, arising out of, or relating in any way to
          your access to or use of our Services, your Content, your conduct
          toward other users, or your breach of this Agreement.
        </Text>
        &nbsp;
        <Text fontWeight="500">19. ACCEPTANCE OF TERMS</Text>
        &nbsp;
        <Text>
          By using our Services, you accept the Terms of this Agreement. By
          using our Services, whether through a mobile device, mobile
          application, or computer, you agree to be bound by (i) these Terms,
          which we may amend from time to time, (ii) our Privacy Policy, Cookie
          Policy, Community Rules, and Safety Tips, and (iii) any Additional
          Terms Upon Purchase. If you do not accept and agree to be bound by all
          of the terms of this Agreement, you are not entitled to use our
          Services. All pronouns and any variations thereof shall be deemed to
          refer to the masculine, feminine, neuter, singular or plural as the
          identity of the entities or persons referred to any require.
        </Text>
        &nbsp;
        <Text fontWeight="500">20. ENTIRE AGREEMENT</Text>
        &nbsp;
        <Text>
          This Agreement supersedes any previous agreements or representations.
          These Terms, with the Privacy Policy, Cookie Policy, Community Rules,
          and Safety Tips, and any Additional Terms Upon Purchase, contain the
          entire agreement between you and ProSocial regarding the use of our
          Services. The Terms supersede all previous agreements,
          representations, and arrangements between us, written or oral. If any
          provision of these Terms is held invalid, illegal, or otherwise
          unenforceable, the remainder of the Terms shall continue in full force
          and effect. The failure of the Company to exercise or enforce any
          right or provision of these Terms shall not constitute a waiver of
          such right or provision. You agree that your ProSocial account is non-
          transferable and all of your rights to your account and its content
          terminate upon your death, unless otherwise provided by law. Any
          rights and licenses granted hereunder may not be transferred or
          assigned by you but may be assigned by us without restriction. No
          agency, partnership, joint venture, fiduciary or other special
          relationship or employment is created as a result of these Terms, and
          you may not make any representations on behalf of or bind ProSocial in
          any manner.
        </Text>
        &nbsp;
        <Text fontWeight="500">21. SPECIAL STATE TERMS</Text>
        &nbsp;
        <Text>
          Your Right to Cancel—You may cancel your subscription, without penalty
          or obligation, at any time prior to midnight of the third business day
          following the date you subscribed. In the event that you die before
          the end of your subscription period, your estate shall be entitled to
          a refund of that portion of any payment you had made for your
          subscription which is allocable to the period after your death. In the
          event that you become disabled (such that you are unable to use our
          Services) before the end of your subscription period, you shall be
          entitled to a refund of that portion of any payment you had made for
          your subscription which is allocable to the period after your
          disability by providing the Company notice in the same manner as you
          request a refund as described above in Section 8.
        </Text>
      </Box>
      <Box>
        <Flex justifyContent="center" gap="4" mt="8">
          <Button variant="secondary" onClick={openDeclineModal}>
            Decline
          </Button>
          <Link href={appRouteLinks.register}>
            <Button>Accept</Button>
          </Link>
        </Flex>
      </Box>
      <AppModal
        title="Are you sure you want to decline?"
        description="We won't be able to match you with other ProSocial users if you do not accept our terms and conditions"
        onClose={closeDeclineModal}
        isOpen={isDeclineModal}
        actionButtons={<Button onClick={closeDeclineModal}>Close App</Button>}
      />
    </>
  );
}
