import { createConnection, getConnection, QueryRunner } from 'typeorm';
import { News } from '../entity/News';
import { Script } from '../entity/Script';
import { Tag } from '../entity/Tag';
import { Category } from '../shared/common/Category';
import { Channel } from '../shared/common/Channel';
import { Gender } from '../shared/common/Gender';
import { Suitability } from '../shared/common/Suitability';
import { Time } from '../vo/Time';

// 추천 태그 생성
let tagTestRecommend = new Tag();
tagTestRecommend.name = '딜리버블 추천';

// 뉴스 별 태그, 스크립트 생성

// 1번 뉴스
let tagTest1_1 = new Tag();
tagTest1_1.name = '경제';
let tagTest1_2 = new Tag();
tagTest1_2.name = '비트코인';
let tagTest1_3 = new Tag();
tagTest1_3.name = '폭락';

let scriptTest1_1 = new Script();
scriptTest1_1.startTime = new Time(0, 0);
scriptTest1_1.endTime = new Time(7, 7);
scriptTest1_1.text = '비트코인 가격이 1만 8천 달러선으로 폭락하면서 2020년 이후 최대치를 나타내고 있습니다.';
let scriptTest1_2 = new Script();
scriptTest1_2.startTime = new Time(7, 7);
scriptTest1_2.endTime = new Time(14, 78);
scriptTest1_2.text = '가상화폐 정보 사이트 코인게코에 따르면 비트코인 가격은 오늘 오전 한때 1만 7,800달러까지 하락하기도 했습니다.';
let scriptTest1_3 = new Script();
scriptTest1_3.startTime = new Time(14, 78);
scriptTest1_3.endTime = new Time(20, 55);
scriptTest1_3.text = '비트코인은 물가 상승 압력에 따른 세계적인 금리 인상 등의 여파로 12일 연속 하락했습니다.';
let scriptTest1_4 = new Script();
scriptTest1_4.startTime = new Time(20, 55);
scriptTest1_4.endTime = new Time(26, 55);
scriptTest1_4.text = '시가총액 2위 이더리움의 가격은 1천 달러가 무너지는 등 다른 코인의 가격도 동반 하락했습니다.';
let scriptTest1_5 = new Script();
scriptTest1_5.startTime = new Time(26, 85);
scriptTest1_5.endTime = new Time(35, 4);
scriptTest1_5.text = '가격이 폭락하면서 한때 3조 달러가 넘었던 전 세계 가상화폐 시장의 시가총액은 8천억 달러 선으로 하락했습니다.';

// 2번 뉴스
let tagTest2_1 = new Tag();
tagTest2_1.name = '북한';
let tagTest2_2 = new Tag();
tagTest2_2.name = '환경';
let tagTest2_3 = new Tag();
tagTest2_3.name = '임진강';

let scriptTest2_1 = new Script();
scriptTest2_1.startTime = new Time(0, 0);
scriptTest2_1.endTime = new Time(8, 18);
scriptTest2_1.text = '북한이 호우로 임진강 상류 황강댐 수문을 개방한 것으로 판단하고 있다고 군 소식통이 오늘 밝혔습니다.';
let scriptTest2_2 = new Script();
scriptTest2_2.startTime = new Time(8, 18);
scriptTest2_2.endTime = new Time(16, 71);
scriptTest2_2.text = '정부는 지난 28일 북한에 댐을 방류하면 사전 통지해 달라고 요청했지만, 북한은 이에 대한 응답 없이 방류에 나선 것으로 보입니다.';
let scriptTest2_3 = new Script();
scriptTest2_3.startTime = new Time(16, 71);
scriptTest2_3.endTime = new Time(27, 10);
scriptTest2_3.text = '군남댐 수위와 연계되는 임진강 최북단 필승교의 수위는 지난 28일 6m까지 오르기도 했지만 이후 현재까지 안정적으로 관리되고 있는 것으로 알려졌습니다.';
let scriptTest2_4 = new Script();
scriptTest2_4.startTime = new Time(27, 10);
scriptTest2_4.endTime = new Time(35, 74);
scriptTest2_4.text = '통일부는 이와 관련해 북한이 사전 통지 없이 황강댐 물을 방류한 데 대해 유감이라고 밝혔습니다.';

// 3번 뉴스
let tagTest3_1 = new Tag();
tagTest3_1.name = '제주';
let tagTest3_2 = new Tag();
tagTest3_2.name = '예산';
let tagTest3_3 = new Tag();
tagTest3_3.name = '무상급식';

let scriptTest3_1 = new Script();
scriptTest3_1.startTime = new Time(0, 0);
scriptTest3_1.endTime = new Time(4, 74);
scriptTest3_1.text = '초중고교 무상급식 예산이 46억 원 증액됩니다.';
let scriptTest3_2 = new Script();
scriptTest3_2.startTime = new Time(4, 74);
scriptTest3_2.endTime = new Time(15, 13);
scriptTest3_2.text = '오영훈 제주도지사와 김광수 제주도 교육감은 한라중학교를 찾아 올해 추경에 무상급식 예산 46억 원을 증액 반영하기로 합의했다고 밝혔습니다.';
let scriptTest3_3 = new Script();
scriptTest3_3.startTime = new Time(15, 13);
scriptTest3_3.endTime = new Time(21, 62);
scriptTest3_3.text = '이에 따라 무상급식 예산이 현재 439억 원에서 485억 원으로 늘게 됐습니다.';
let scriptTest3_4 = new Script();
scriptTest3_4.startTime = new Time(21, 62);
scriptTest3_4.endTime = new Time(30, 2);
scriptTest3_4.text = '중학생 1인당 1식 단가는 현재 2,980원에서 24% 인상된 3,695원으로 오르게 됐습니다.';
let scriptTest3_5 = new Script();
scriptTest3_5.startTime = new Time(30, 2);
scriptTest3_5.endTime = new Time(35, 0);
scriptTest3_5.text = '인상된 단가는 다음 학기부터 적용됩니다.';
let scriptTest3_6 = new Script();
scriptTest3_6.startTime = new Time(35, 0);
scriptTest3_6.endTime = new Time(37, 80);
scriptTest3_6.text = '지금까지 제주에서 전해 드렸습니다.';

// 4번 뉴스
let tagTest4_1 = new Tag();
tagTest4_1.name = '범죄';
let tagTest4_2 = new Tag();
tagTest4_2.name = '사망사고';
let tagTest4_3 = new Tag();
tagTest4_3.name = '공무원';

let scriptTest4_1 = new Script();
scriptTest4_1.startTime = new Time(0, 0);
scriptTest4_1.endTime = new Time(4, 74);
scriptTest4_1.text = '오늘 오전 9시쯤 경북 안동시청 주차타워 2층에서 50대 여성 공무원 A 씨가 쓰러진 채 발견됐습니다.';
let scriptTest4_2 = new Script();
scriptTest4_2.startTime = new Time(4, 74);
scriptTest4_2.endTime = new Time(15, 13);
scriptTest4_2.text = 'A 씨는 흉기에 복부를 찔려 크게 다친 상태로 병원으로 옮겨졌지만 1시간여 만에 숨졌습니다.';
let scriptTest4_3 = new Script();
scriptTest4_3.startTime = new Time(15, 13);
scriptTest4_3.endTime = new Time(21, 62);
scriptTest4_3.text = '용의자는 시청 산하기관 직원인 40대 남성 B 씨로 범행 직후 경찰에 자수했습니다.';
let scriptTest4_4 = new Script();
scriptTest4_4.startTime = new Time(21, 62);
scriptTest4_4.endTime = new Time(30, 2);
scriptTest4_4.text = '경찰은 B 씨가 사용한 흉기를 확보하고 범행 동기를 추궁하고 있습니다.';

// 5번 뉴스
let tagTest5_1 = new Tag();
tagTest5_1.name = '장관';
let tagTest5_2 = new Tag();
tagTest5_2.name = '인사';
let tagTest5_3 = new Tag();
tagTest5_3.name = '사퇴';

let scriptTest5_1 = new Script();
scriptTest5_1.startTime = new Time(0, 0);
scriptTest5_1.endTime = new Time(5, 47);
scriptTest5_1.text = '김승희 보건복지부 장관 후보자는 오늘 오전 입장문을 내고 후보직 사퇴 의사를 밝혔습니다.';
let scriptTest5_2 = new Script();
scriptTest5_2.startTime = new Time(5, 47);
scriptTest5_2.endTime = new Time(15, 74);
scriptTest5_2.text = '김 후보자는 지명 이후 객관적 근거가 없거나 관련이 없는 가족들의 사생활까지 수많은 비판이 제기됐다면서 각종 의혹이 사실이 아님을 반복적으로 설명했지만,';
let scriptTest5_3 = new Script();
scriptTest5_3.startTime = new Time(15, 74);
scriptTest5_3.endTime = new Time(23, 87);
scriptTest5_3.text = '이 과정에서 공직자로서 부끄럽지 않게 살아왔던 자신의 명예는 물론이고 가족들까지 상처를 입는 것이 매우 힘들었다고 설명했습니다.';
let scriptTest5_4 = new Script();
scriptTest5_4.startTime = new Time(23, 87);
scriptTest5_4.endTime = new Time(32, 43);
scriptTest5_4.text = '또 정치 자금 의혹에 대해서는 고의적으로 사적인 용도로 유용한 바가 전혀 없으며 회계 처리 과정에서 실무적인 착오로 문제가 생겼지만,';
let scriptTest5_5 = new Script();
scriptTest5_5.startTime = new Time(32, 43);
scriptTest5_5.endTime = new Time(40, 0);
scriptTest5_5.text = '이러한 사실과 별개로 최종적으로 관리 책임에서 자유로울 수 없다는 지적을 겸허하게 수용한다고 덧붙였습니다.';

// 6번 뉴스
let tagTest6_1 = new Tag();
tagTest6_1.name = '영국';
let tagTest6_2 = new Tag();
tagTest6_2.name = '중국';
let tagTest6_3 = new Tag();
tagTest6_3.name = '홍콩';

let scriptTest6_1 = new Script();
scriptTest6_1.startTime = new Time(0, 0);
scriptTest6_1.endTime = new Time(7, 23);
scriptTest6_1.text = '존슨 영국 총리는 중국이 25년 전 홍콩 주권을 돌려받을 때 약속을 지키지 않고 있다고 비판했습니다. ';
let scriptTest6_2 = new Script();
scriptTest6_2.startTime = new Time(7, 23);
scriptTest6_2.endTime = new Time(16, 12);
scriptTest6_2.text = '존슨 총리는 트위터에 올린 영상 메시지에서 영국이 1997년 홍콩을 반환한 뒤 중국은 일국양제를 준수하지 않고 있다고 말했습니다.';
let scriptTest6_3 = new Script();
scriptTest6_3.startTime = new Time(16, 12);
scriptTest6_3.endTime = new Time(25, 81);
scriptTest6_3.text = '영국과 중국은 1984년 공동선언을 통해 홍콩이 반환된 이후에도 50년 동안 고도의 자치와 함께 기존 체제를 유지하는 데 합의했습니다. ';
let scriptTest6_4 = new Script();
scriptTest6_4.startTime = new Time(25, 81);
scriptTest6_4.endTime = new Time(38, 89);
scriptTest6_4.text = '하지만 존슨 총리는 홍콩인들의 권리와 자유, 번영이 위협받는 상황이라면서 홍콩을 포기하지 않고 25년 전 약속을 지킬 것이며 중국이 약속을 지키도록 최선을 다하겠다고 밝혔습니다.';

// 7번 뉴스
let tagTest7_1 = new Tag();
tagTest7_1.name = '대선';
let tagTest7_2 = new Tag();
tagTest7_2.name = '이재명';
let tagTest7_3 = new Tag();
tagTest7_3.name = '의전논란';

let scriptTest7_1 = new Script();
scriptTest7_1.startTime = new Time(0, 0);
scriptTest7_1.endTime = new Time(13, 57);
scriptTest7_1.text = '더불어민주당 이재명 대선 후보의 부인 김혜경 씨가 자신에게 제기된 의전 논란과 관련해서 모든 것이 자신의 불찰이라며 국민 여러분께 심려를 끼쳐드린 데 대해 송구하다고 밝혔습니다. ';
let scriptTest7_2 = new Script();
scriptTest7_2.startTime = new Time(13, 57);
scriptTest7_2.endTime = new Time(30, 9);
scriptTest7_2.text = '김 씨는 기자들에게 배포한 입장문을 통해서 자신의 사적 용무를 대신했다고 주장한 전직 경기도 비서 a 씨의 주장에 대해 있어서는 안 될 일이 있었다며 그동안 고통받았을 a모 비서가 얼마나 힘들었을지 생각하니 마음이 아린다고 덧붙였습니다. ';
let scriptTest7_3 = new Script();
scriptTest7_3.startTime = new Time(30, 9);
scriptTest7_3.endTime = new Time(42, 78);
scriptTest7_3.text = '김혜경 씨는 공과 사를 명료하게 가려야 했는데 a 비서 상관이었던 경기도 사무관 배 모 씨와 친분이 있어 도움을 받았다면서도 상시 조력을 받은 것은 아니라고 해명했습니다.';

// 8번 뉴스
let tagTest8_1 = new Tag();
tagTest8_1.name = '우크라이나';
let tagTest8_2 = new Tag();
tagTest8_2.name = '루가노선언';
let tagTest8_3 = new Tag();
tagTest8_3.name = '경제회복';

let scriptTest8_1 = new Script();
scriptTest8_1.startTime = new Time(0, 0);
scriptTest8_1.endTime = new Time(7, 80);
scriptTest8_1.text = '이 시각 세계입니다.';
let scriptTest8_2 = new Script();
scriptTest8_2.startTime = new Time(7, 80);
scriptTest8_2.endTime = new Time(15, 89);
scriptTest8_2.text = '한국을 포함한 40여 개국 정상들이 러시아의 침공으로 초토화된 우크라이나를 투명하고 민주적으로 재건하기로 약속했습니다.';
let scriptTest8_3 = new Script();
scriptTest8_3.startTime = new Time(15, 89);
scriptTest8_3.endTime = new Time(26, 95);
scriptTest8_3.text = '스위스에서 이틀간 진행된 우크라이나 회의에 참석한 40여 개국 지도자들은 우크라이나의 경제 회복을 돕기 위한 루가노 선언에 서명했는데요.';
let scriptTest8_4 = new Script();
scriptTest8_4.startTime = new Time(26, 95);
scriptTest8_4.endTime = new Time(37, 13);
scriptTest8_4.text = '선언에 서명한 국가들은 우크라이나의 전후 복구 지원을 약속하는 한편, 투명성을 높이고 부패를 척결하기 위한 개혁 필요성에 동의했습니다.';
let scriptTest8_5 = new Script();
scriptTest8_5.startTime = new Time(37, 13);
scriptTest8_5.endTime = new Time(46, 67);
scriptTest8_5.text = '회담을 공동주최한 이그나지오 카시스 스위스 대통령은 루가노 선언은 우크라이나 재건을 위한 긴 여정의 시작이라고 평가했습니다.';
let scriptTest8_6 = new Script();
scriptTest8_6.startTime = new Time(46, 67);
scriptTest8_6.endTime = new Time(56, 0);
scriptTest8_6.text = '앞서 우크라이나 정부는 자국 재건 비용으로 7,500억 달러, 약 972조 원이 필요하다고 자체 추산했습니다.';

// 9번 뉴스
let tagTest9_1 = new Tag();
tagTest9_1.name = '원숭이두창';
let tagTest9_2 = new Tag();
tagTest9_2.name = '치료제';
let tagTest9_3 = new Tag();
tagTest9_3.name = '중대본';

let scriptTest9_1 = new Script();
scriptTest9_1.startTime = new Time(0, 0);
scriptTest9_1.endTime = new Time(6, 18);
scriptTest9_1.text = '원숭이두창 치료제인 테코비리마트 504명분이 이번 주 국내에 도입됩니다.';
let scriptTest9_2 = new Script();
scriptTest9_2.startTime = new Time(6, 18);
scriptTest9_2.endTime = new Time(16, 70);
scriptTest9_2.text = '중앙방역대책본부는 오늘 도입되는 치료제 물량은 초기 대응에 충분한 수준이라며 향후 발생 양상을 고려해 추가 도입하겠다고 밝혔습니다.';
let scriptTest9_3 = new Script();
scriptTest9_3.startTime = new Time(16, 70);
scriptTest9_3.endTime = new Time(29, 0);
scriptTest9_3.text = '방대본은 백신 접종 계획에 대해선 원숭이두창의 전파력은 강하지 않다며 일반 국민이 광범위하게 예방접종을 할 필요성이 있다고 보지 않는다고 답했습니다.';

// 10번 뉴스
let tagTest10_1 = new Tag();
tagTest10_1.name = 'WHO';
let tagTest10_2 = new Tag();
tagTest10_2.name = '원숭이두창';
let tagTest10_3 = new Tag();
tagTest10_3.name = '확산';

let scriptTest10_1 = new Script();
scriptTest10_1.startTime = new Time(0, 0);
scriptTest10_1.endTime = new Time(8, 87);
scriptTest10_1.text = '세계보건기구 WHO가 올여름 휴가철 원숭이두창 전파 속도가 더 빨라질 수 있다고 경고했습니다.';
let scriptTest10_2 = new Script();
scriptTest10_2.startTime = new Time(9, 0);
scriptTest10_2.endTime = new Time(25, 17);
scriptTest10_2.text = '한스 클루즈 WHO 유럽 사무소 소장은 성명에서 코로나19 사태에 따른 국제 여행과 축제 규제를 해지하는 가운데 원숭이두창이 확산했다며 여름철 유럽과 다른 지역에서 추가 전파가 이루어질 가능성이 크다고 밝혔습니다.';
let scriptTest10_3 = new Script();
scriptTest10_3.startTime = new Time(25, 17);
scriptTest10_3.endTime = new Time(36, 0);
scriptTest10_3.text = '또 현재 코로나19와 같은 방역 조처가 필요하지는 않을 것이지만 바이러스 확산을 완벽하게 억제할 수 있을지는 아직 알 수 없다고 우려했습니다.';

// 11번 뉴스
let tagTest11_1 = new Tag();
tagTest11_1.name = '일본';
let tagTest11_2 = new Tag();
tagTest11_2.name = '선진국';
let tagTest11_3 = new Tag();
tagTest11_3.name = '경제';

let scriptTest11_1 = new Script();
scriptTest11_1.startTime = new Time(0, 0);
scriptTest11_1.endTime = new Time(2, 19);
scriptTest11_1.text = '선진국 탈락이 임박했다.';
let scriptTest11_2 = new Script();
scriptTest11_2.startTime = new Time(2, 19);
scriptTest11_2.endTime = new Time(5, 9);
scriptTest11_2.text = '몰락 전 중국 청나라 말기 같다.';
let scriptTest11_3 = new Script();
scriptTest11_3.startTime = new Time(5, 9);
scriptTest11_3.endTime = new Time(10, 20);
scriptTest11_3.text = '요즘 일본 경제에 대해 내부에서 잇따라 나오는 혹독한 경고음들입니다.';
let scriptTest11_4 = new Script();
scriptTest11_4.startTime = new Time(10, 20);
scriptTest11_4.endTime = new Time(20, 81);
scriptTest11_4.text = '1990년대 버블 붕괴 뒤 나온 잃어버린 10년이라는 말은 아직도 회복하지 못한 장기 침체 때문에 잃어버린 30년으로 바뀌게 됐습니다.';
let scriptTest11_5 = new Script();
scriptTest11_5.startTime = new Time(20, 81);
scriptTest11_5.endTime = new Time(24, 57);
scriptTest11_5.text = '어느 정도인지 도쿄에서 고현승 특파원이 전합니다.';

// 12번 뉴스
let tagTest12_1 = new Tag();
tagTest12_1.name = '서울';
let tagTest12_2 = new Tag();
tagTest12_2.name = '경찰';
let tagTest12_3 = new Tag();
tagTest12_3.name = '마약';

let scriptTest12_1 = new Script();
scriptTest12_1.startTime = new Time(0, 0);
scriptTest12_1.endTime = new Time(12, 16);
scriptTest12_1.text = '서울의 한 유흥주점 여 종업원이 손님이 건넨 술을 마신 뒤에 숨지는 사건이 발생해서 경찰이 수사에 나섰다는 기사도 많이 봤습니다.';
let scriptTest12_2 = new Script();
scriptTest12_2.startTime = new Time(12, 16);
scriptTest12_2.endTime = new Time(20, 27);
scriptTest12_2.text = '어제 오전 7시 50분쯤 서울 강남의 한 유흥주점에서 30대 여 종업원 A 씨가 의식을 잃고 쓰러졌습니다.';
let scriptTest12_3 = new Script();
scriptTest12_3.startTime = new Time(20, 27);
scriptTest12_3.endTime = new Time(28, 82);
scriptTest12_3.text = '유흥주점 동료는 A 씨가 손님들이 건넨 술을 마신 뒤에 쓰러졌다며 마약이 의심된다고 119와 경찰에 신고했습니다.';
let scriptTest12_4 = new Script();
scriptTest12_4.startTime = new Time(28, 82);
scriptTest12_4.endTime = new Time(32, 94);
scriptTest12_4.text = 'A 씨는 인근 병원으로 옮겨졌지만 결국 숨졌습니다.';
let scriptTest12_5 = new Script();
scriptTest12_5.startTime = new Time(32, 94);
scriptTest12_5.endTime = new Time(42, 17);
scriptTest12_5.text = '그런데 비슷한 시각 이 술자리에 함께 있었던 남성이 유흥주점에서 약 700m 떨어진 도심 한복판에서 교통사고를 냈습니다.';
let scriptTest12_6 = new Script();
scriptTest12_6.startTime = new Time(42, 17);
scriptTest12_6.endTime = new Time(48, 47);
scriptTest12_6.text = '경찰이 출동했을 당시 차량에서 마약으로 추정되는 봉투가 발견된 것으로 알려졌는데요.';
let scriptTest12_7 = new Script();
scriptTest12_7.startTime = new Time(48, 47);
scriptTest12_7.endTime = new Time(52, 28);
scriptTest12_7.text = '남성도 병원으로 옮겨졌지만 숨졌습니다.';
let scriptTest12_8 = new Script();
scriptTest12_8.startTime = new Time(52, 28);
scriptTest12_8.endTime = new Time(61, 0);
scriptTest12_8.text = '경찰은 술에 섞인 물질과 손님들의 인적 사항을 확인하는 동시에 두 사건 사이의 관련성을 수사하고 있습니다.';

// 13번 뉴스
let tagTest13_1 = new Tag();
tagTest13_1.name = '코로나';
let tagTest13_2 = new Tag();
tagTest13_2.name = '경제';
let tagTest13_3 = new Tag();
tagTest13_3.name = '인테리어';

let scriptTest13_1 = new Script();
scriptTest13_1.startTime = new Time(0, 0);
scriptTest13_1.endTime = new Time(7, 22);
scriptTest13_1.text = '코로나19로 폐업하거나 일자리를 잃은 사람도 많지만 반대로 몸값이 뛴 직종이 있습니다.';
let scriptTest13_2 = new Script();
scriptTest13_2.startTime = new Time(7, 22);
scriptTest13_2.endTime = new Time(13, 21);
scriptTest13_2.text = '코로나19 사태 이후 인테리어 수요 급증으로 시공 인력이 부족해지면서 일당이 껑충 뛰었습니다.';
let scriptTest13_3 = new Script();
scriptTest13_3.startTime = new Time(13, 21);
scriptTest13_3.endTime = new Time(22, 68);
scriptTest13_3.text = '업계에 따르면 올해 도배나 도장, 타일 등 인테리어 시공 직종의 일당은 1년 새 최대 40%, 많게는 10만 원 이상 올랐다는데요.';
let scriptTest13_4 = new Script();
scriptTest13_4.startTime = new Time(22, 68);
scriptTest13_4.endTime = new Time(29, 5);
scriptTest13_4.text = '도장 일당은 최대 40만 원에 이르고 도배사도 20만 원 후반대 수입을 올리는 것으로 알려졌습니다.';
let scriptTest13_5 = new Script();
scriptTest13_5.startTime = new Time(29, 5);
scriptTest13_5.endTime = new Time(36, 0);
scriptTest13_5.text = '경력으로 쌓인 노하우와 기술이 중요한 직종인 만큼 이들의 몸값은 더 높아질 것으로 보입니다.';
 
// 14번 뉴스
let tagTest14_1 = new Tag();
tagTest14_1.name = '과학';
let tagTest14_2 = new Tag();
tagTest14_2.name = '우주';
let tagTest14_3 = new Tag();
tagTest14_3.name = '누리호';

let scriptTest14_1 = new Script();
scriptTest14_1.startTime = new Time(0, 0);
scriptTest14_1.endTime = new Time(1, 23);
scriptTest14_1.text = '여러분 안녕하십니까.';
let scriptTest14_2 = new Script();
scriptTest14_2.startTime = new Time(1, 23);
scriptTest14_2.endTime = new Time(10, 66);
scriptTest14_2.text = '하늘은 파란 크레파스로 칠한 듯 선명했고, 그 안에 누리호가 동그란 점으로 희미해질 때까지 마음 졸이면서 1초 1초를 지켜봤습니다.';
let scriptTest14_3 = new Script();
scriptTest14_3.startTime = new Time(10, 66);
scriptTest14_3.endTime = new Time(17, 43);
scriptTest14_3.text = '수많은 사람들의 우주를 향한 꿈이 한 걸음 앞으로 나아간 날, 특집 9시 뉴스 시작합니다.';
let scriptTest14_4 = new Script();
scriptTest14_4.startTime = new Time(17, 43);
scriptTest14_4.endTime = new Time(25, 84);
scriptTest14_4.text = '누리호는 700킬로미터 상공, 목표 궤도까지 오르면서 여덟 달 전, 끝내지 못한 숙제를 성공적으로 마무리했습니다.';
let scriptTest14_5 = new Script();
scriptTest14_5.startTime = new Time(25, 84);
scriptTest14_5.endTime = new Time(29, 47);
scriptTest14_5.text = '먼저 발사 순간, 김민아 기자가 전해드립니다.';

// 15번 뉴스
let tagTest15_1 = new Tag();
tagTest15_1.name = '송해';
let tagTest15_2 = new Tag();
tagTest15_2.name = '별세';
let tagTest15_3 = new Tag();
tagTest15_3.name = '빈소';

let scriptTest15_1 = new Script();
scriptTest15_1.startTime = new Time(0, 0);
scriptTest15_1.endTime = new Time(1, 98);
scriptTest15_1.text = '여러분 안녕하십니까.';
let scriptTest15_2 = new Script();
scriptTest15_2.startTime = new Time(1, 98);
scriptTest15_2.endTime = new Time(7, 52);
scriptTest15_2.text = '"그는 바다 해(海) 자를 따서 마음속으로 자신을 \'송해\' 라고 불러보았다.”';
let scriptTest15_3 = new Script();
scriptTest15_3.startTime = new Time(7, 52);
scriptTest15_3.endTime = new Time(13, 55);
scriptTest15_3.text = '이름 두 글자에 바다를 품었던 희극인 송해 선생이 우리 곁을 떠났습니다.';
let scriptTest15_4 = new Script();
scriptTest15_4.startTime = new Time(13, 55);
scriptTest15_4.endTime = new Time(16, 26);
scriptTest15_4.text = '향년, 우리 나이 아흔 다섯입니다.';
let scriptTest15_5 = new Script();
scriptTest15_5.startTime = new Time(16, 26);
scriptTest15_5.endTime = new Time(27, 52);
scriptTest15_5.text = '자연인 송복희가 아닌 국민 진행자 송해로, 34년 동안 일요일 오후를 행복하게 만들어줬던 송해 선생 별세 소식으로, 오늘 9시 뉴스 시작합니다.';
let scriptTest15_6 = new Script();
scriptTest15_6.startTime = new Time(27, 52);
scriptTest15_6.endTime = new Time(31, 2);
scriptTest15_6.text = '먼저 빈소가 마련된 서울대병원 연결하겠습니다.';

// 16번 뉴스
let tagTest16_1 = new Tag();
tagTest16_1.name = '윤석열';
let tagTest16_2 = new Tag();
tagTest16_2.name = '권력사유화';
let tagTest16_3 = new Tag();
tagTest16_3.name = '친인척';

let scriptTest16_1 = new Script();
scriptTest16_1.startTime = new Time(0, 0);
scriptTest16_1.endTime = new Time(14, 4);
scriptTest16_1.text = '윤석열 대통령은 친인척인 선임 행정관 최모 씨의 부속실 근무를 둘러싼 논란과 관련해서 정치를 처음 시작할 때부터 캠프에서, 당사에서 공식적으로 함께 선거운동을 해 온 동지라고 밝혔습니다.';
let scriptTest16_2 = new Script();
scriptTest16_2.startTime = new Time(14, 4);
scriptTest16_2.endTime = new Time(20, 59);
scriptTest16_2.text = '윤 대통령은 출근길에 기자들과 만나 권력 사유화라는 비판에 어떤 입장이냐는 질문에 이같이 말했습니다.';
let scriptTest16_3 = new Script();
scriptTest16_3.startTime = new Time(20, 59);
scriptTest16_3.endTime = new Time(28, 93);
scriptTest16_3.text = '윤 대통령은 8촌인 최 씨는 부속실에서 이른바 관저팀 소속 팀장을 맡으며 김 여사 보좌 업무를 주로 담당한 것으로 알려졌습니다.';
let scriptTest16_4 = new Script();
scriptTest16_4.startTime = new Time(28, 93);
scriptTest16_4.endTime = new Time(35, 81);
scriptTest16_4.text = '윤 대통령은 또 나토 수행팀 문제는 이미 대변인이 말씀드린 것 같다며 말을 아꼈습니다.';

// 17번 뉴스
let tagTest17_1 = new Tag();
tagTest17_1.name = '의학';
let tagTest17_2 = new Tag();
tagTest17_2.name = '식중독';
let tagTest17_3 = new Tag();
tagTest17_3.name = '버섯';

let scriptTest17_1 = new Script();
scriptTest17_1.startTime = new Time(0, 0);
scriptTest17_1.endTime = new Time(7, 84);
scriptTest17_1.text = '장마철 야생에서 채취한 버섯은 식중독 위험이 높아 되도록 먹지 말 것을 식품의약품안전처가 권고했습니다.';
let scriptTest17_2 = new Script();
scriptTest17_2.startTime = new Time(7, 84);
scriptTest17_2.endTime = new Time(21, 16);
scriptTest17_2.text = '식약처는 국내 자생 버섯 1,900여 종 가운데 먹을 수 있는 건 400종에 불과하다면서, 가열하더라도 독버섯 성분은 대부분 남아 있기 때문에 익혀 먹으면 안전하다고 믿어선 안 된다고 강조했습니다.';
let scriptTest17_3 = new Script();
scriptTest17_3.startTime = new Time(21, 16);
scriptTest17_3.endTime = new Time(29, 41);
scriptTest17_3.text = '버섯을 먹은 뒤 통증이 생기면 즉시 토해내고, 먹은 버섯을 가지고 즉시 병원에 방문하라고 식약처는 당부했습니다.';

// 18번 뉴스
let tagTest18_1 = new Tag();
tagTest18_1.name = '법원';
let tagTest18_2 = new Tag();
tagTest18_2.name = '사기';
let tagTest18_3 = new Tag();
tagTest18_3.name = '마약';

let scriptTest18_1 = new Script();
scriptTest18_1.startTime = new Time(0, 0);
scriptTest18_1.endTime = new Time(11, 36);
scriptTest18_1.text = '20대 20여 명이 모여 사기 행각을 벌이고 마약 파티를 했던 이른바 검단 식구들의 주범, A 씨에 대해 1심 법원이 징역 5년을 선고했습니다.';
let scriptTest18_2 = new Script();
scriptTest18_2.startTime = new Time(11, 36);
scriptTest18_2.endTime = new Time(18, 50);
scriptTest18_2.text = '인천지법은 오늘 열린 선고공판에서 A씨의 죄질이 가볍지 않다며 징역 5년을 선고했습니다.';
let scriptTest18_3 = new Script();
scriptTest18_3.startTime = new Time(18, 50);
scriptTest18_3.endTime = new Time(28, 92);
scriptTest18_3.text = 'A 씨는 지인 여성들에게 접근해 취업을 대가로 대출을 받게 하고 돈을 가로챘고 이들 가운데 일부를 감금, 폭행한 혐의를 받고 있습니다.';

// 19번 뉴스
let tagTest19_1 = new Tag();
tagTest19_1.name = '가격';
let tagTest19_2 = new Tag();
tagTest19_2.name = '담합';
let tagTest19_3 = new Tag();
tagTest19_3.name = '토종닭';

let scriptTest19_1 = new Script();
scriptTest19_1.startTime = new Time(0, 0);
scriptTest19_1.endTime = new Time(8, 83);
scriptTest19_1.text = '국내 토종닭 신선육 가격을 4년 가까이 담합해 온 사업자들에게 공정거래위원회가 과징금을 부과하기로 했습니다.';
let scriptTest19_2 = new Script();
scriptTest19_2.startTime = new Time(8, 83);
scriptTest19_2.endTime = new Time(21, 67);
scriptTest19_2.text = '공정위는 하림과 올품, 체리부로, 참프레 등 국내 9개 토종닭 신선육 제조·판매사업자에게 시정명령과 함께 5억 9,500만 원의 과징금을 부과하기로 결정했다고 밝혔습니다.';
let scriptTest19_3 = new Script();
scriptTest19_3.startTime = new Time(21, 67);
scriptTest19_3.endTime = new Time(34, 19);
scriptTest19_3.text = '이들은 2013년부터 2017년 사이 4차례에 걸쳐 토종닭의 판매 가격과 출고량을 합의하고 가격에 영향을 미치는 비용 등을 공동으로 결정한 것으로 조사됐습니다.';

// 20번 뉴스
let tagTest20_1 = new Tag();
tagTest20_1.name = '통행료';
let tagTest20_2 = new Tag();
tagTest20_2.name = '국토부';
let tagTest20_3 = new Tag();
tagTest20_3.name = '친환경차';

let scriptTest20_1 = new Script();
scriptTest20_1.startTime = new Time(0, 0);
scriptTest20_1.endTime = new Time(7, 47);
scriptTest20_1.text = '올해 말 종료 예정이었던 전기·수소차와 화물차 통행료 감면 제도가 2년 더 연장됩니다.';
let scriptTest20_2 = new Script();
scriptTest20_2.startTime = new Time(7, 47);
scriptTest20_2.endTime = new Time(14, 51);
scriptTest20_2.text = '국토부는 이런 내용을 담은 유료도로법 시행령 개정안을 다음 달 11일까지 입법 예고한다고 밝혔습니다.';
let scriptTest20_3 = new Script();
scriptTest20_3.startTime = new Time(14, 51);
scriptTest20_3.endTime = new Time(24, 74);
scriptTest20_3.text = '정부는 미세먼지 저감과 친환경차 보급 확대를 위해 2017년 9월부터 전기 수소차에 대한 고속도로 통행료를 50% 감면해주고 있습니다.';
let scriptTest20_4 = new Script();
scriptTest20_4.startTime = new Time(24, 74);
scriptTest20_4.endTime = new Time(34, 46);
scriptTest20_4.text = '애초 이 제도는 연말에 종료될 예정이었지만 시행령이 개정되면 해당 운전자는 2024년 12월까지 감면 혜택을 받을 수 있습니다.';
let scriptTest20_5 = new Script();
scriptTest20_5.startTime = new Time(34, 46);
scriptTest20_5.endTime = new Time(40, 50);
scriptTest20_5.text = '또 화물차에 대한 고속도로 통행료 심야 할인 역시 2년 더 연장하기로 했습니다.';

// 21번 뉴스
let tagTest21_1 = new Tag();
tagTest21_1.name = 'IMF';
let tagTest21_2 = new Tag();
tagTest21_2.name = '경제전망';
let tagTest21_3 = new Tag();
tagTest21_3.name = '경기침체';

let scriptTest21_1 = new Script();
scriptTest21_1.startTime = new Time(0, 0);
scriptTest21_1.endTime = new Time(11, 57);
scriptTest21_1.text = '크리스탈리나 게이오르에바 IMF 총재가 현지 시간 6일 글로벌 경제 전망이 상당히 어두워졌다며 내년에 전 세계적인 경기침체가 닥칠 가능성이 있다고 경고했습니다.';
let scriptTest21_2 = new Script();
scriptTest21_2.startTime = new Time(11, 57);
scriptTest21_2.endTime = new Time(26, 78);
scriptTest21_2.text = '게오르게이바 총재는 이날 로이터통신과의 인터뷰에서 인플레이션 확산, 실질 금리 인상, 중국 경제 성장 둔화, 우크라이나 침공 등을 언급하며 4월 업데이트 이후 전망이 상당히 어두워졌다며 우리는 매우 거친 바다에 있다고 말했습니다.';
let scriptTest21_3 = new Script();
scriptTest21_3.startTime = new Time(26, 78);
scriptTest21_3.endTime = new Time(36, 0);
scriptTest21_3.text = '또 조만간 올해 세계 경제성장률 전망을 하향 조정하겠다고 밝혔는데 이럴 경우 올 들어 세 번째 이루어지는 IMF의 전망치 하향 조정입니다.';

// 22번 뉴스
let tagTest22_1 = new Tag();
tagTest22_1.name = 'BTS';
let tagTest22_2 = new Tag();
tagTest22_2.name = '대면공연';
let tagTest22_3 = new Tag();
tagTest22_3.name = '미국';

let scriptTest22_1 = new Script();
scriptTest22_1.startTime = new Time(0, 0);
scriptTest22_1.endTime = new Time(6, 28);
scriptTest22_1.text = '오늘 이 소식을 전하기 위해 저희 스튜디오도 보랏빛으로 물들여봤는데요.';
let scriptTest22_2 = new Script();
scriptTest22_2.startTime = new Time(6, 28);
scriptTest22_2.endTime = new Time(8, 52);
scriptTest22_2.text = '바로 BTS 이야기입니다.';
let scriptTest22_3 = new Script();
scriptTest22_3.startTime = new Time(8, 52);
scriptTest22_3.endTime = new Time(13, 24);
scriptTest22_3.text = '방탄소년단이 미국 LA에서 2년 만에 대면 공연을 열었습니다.';
let scriptTest22_4 = new Script();
scriptTest22_4.startTime = new Time(13, 24);
scriptTest22_4.endTime = new Time(16, 50);
scriptTest22_4.text = '오늘만 무려 5만 명이 넘는 팬들이 몰렸는데요.';
let scriptTest22_5 = new Script();
scriptTest22_5.startTime = new Time(16, 50);
scriptTest22_5.endTime = new Time(21, 39);
scriptTest22_5.text = '이번 공연의 제목은 BTS 퍼미션 투 댄스 온 스테이지입니다.';
let scriptTest22_6 = new Script();
scriptTest22_6.startTime = new Time(21, 39);
scriptTest22_6.endTime = new Time(27, 73);
scriptTest22_6.text = 'BTS의 노래 제목이기도 하고 팬들과 드디어 만나게 되는 기쁨을 담은 것 같기도 한데요.';
let scriptTest22_7 = new Script();
scriptTest22_7.startTime = new Time(27, 73);
scriptTest22_7.endTime = new Time(33, 47);
scriptTest22_7.text = '어떤 팬이 공연 제목의 알파벳을 재조합해 봤더니 스토리즈 온 팬데믹이 됐다고 합니다.';
let scriptTest22_8 = new Script();
scriptTest22_8.startTime = new Time(33, 47);
scriptTest22_8.endTime = new Time(38, 61);
scriptTest22_8.text = '아직 코로나의 유행은 끝나지 않았지만, BTS는 어떤 스토리를 전했을까요?';
let scriptTest22_9 = new Script();
scriptTest22_9.startTime = new Time(38, 61);
scriptTest22_9.endTime = new Time(41, 33);
scriptTest22_9.text = 'LA에서 김수진 특파원입니다.';

// 23번 뉴스
let tagTest23_1 = new Tag();
tagTest23_1.name = '코로나';
let tagTest23_2 = new Tag();
tagTest23_2.name = '중국';
let tagTest23_3 = new Tag();
tagTest23_3.name = '연휴';

let scriptTest23_1 = new Script();
scriptTest23_1.startTime = new Time(0, 0);
scriptTest23_1.endTime = new Time(5, 76);
scriptTest23_1.text = '중국에서 정부 수립을 기념하는 국경절 연휴가 올해는 무려 팔 일이나 이어졌는데요.';
let scriptTest23_2 = new Script();
scriptTest23_2.startTime = new Time(5, 76);
scriptTest23_2.endTime = new Time(11, 35);
scriptTest23_2.text = '연휴 동안 중국 국내 관광객만 육 억 삼천만 명에 달했다고 합니다.';
let scriptTest23_3 = new Script();
scriptTest23_3.startTime = new Time(11, 35);
scriptTest23_3.endTime = new Time(18, 20);
scriptTest23_3.text = '관광지 곳곳이 이렇게 중국 사람들로 가득 찼는데 마스크 안 쓴 사람들도 자주 눈에 띄었습니다.';
let scriptTest23_4 = new Script();
scriptTest23_4.startTime = new Time(18, 20);
scriptTest23_4.endTime = new Time(26, 67);
scriptTest23_4.text = '이렇게 중국은 코로나가 종식됐다고 과시하려는 것으로 보이지만 이러다 또 코로나가 퍼질 수 있다는 것은 간과했다는 지적이 나옵니다.';
let scriptTest23_5 = new Script();
scriptTest23_5.startTime = new Time(26, 67);
scriptTest23_5.endTime = new Time(28, 99);
scriptTest23_5.text = '강연섭 기자가 보도합니다.';

// 24번 뉴스
let tagTest24_1 = new Tag();
tagTest24_1.name = '윤여정';
let tagTest24_2 = new Tag();
tagTest24_2.name = '오스카';
let tagTest24_3 = new Tag();
tagTest24_3.name = '시상';

let scriptTest24_1 = new Script();
scriptTest24_1.startTime = new Time(0, 0);
scriptTest24_1.endTime = new Time(8, 73);
scriptTest24_1.text = '지난해 영화 미나리로 아카데미 여우조연상을 수상한 윤여정 배우가 올해는 시상자로 오스카 무대에 다시 올랐습니다.';
let scriptTest24_2 = new Script();
scriptTest24_2.startTime = new Time(8, 73);
scriptTest24_2.endTime = new Time(16, 11);
scriptTest24_2.text = '난민을 지지하는 의미의 파란 리본을 달고 등장했는데 올해도 특유의 유머와 재치를 뽐냈습니다.';
let scriptTest24_3 = new Script();
scriptTest24_3.startTime = new Time(16, 11);
scriptTest24_3.endTime = new Time(22, 33);
scriptTest24_3.text = '특히 청각 장애인 수상자에게 수어로 축하인사를 전해서 감동을 안기기도 했습니다.';
let scriptTest24_4 = new Script();
scriptTest24_4.startTime = new Time(22, 33);
scriptTest24_4.endTime = new Time(25, 81);
scriptTest24_4.text = '임소정 기자가 전해드리겠습니다.';

// 25번 뉴스
let tagTest25_1 = new Tag();
tagTest25_1.name = '아베';
let tagTest25_2 = new Tag();
tagTest25_2.name = '총리';
let tagTest25_3 = new Tag();
tagTest25_3.name = '우익';

let scriptTest25_1 = new Script();
scriptTest25_1.startTime = new Time(0, 0);
scriptTest25_1.endTime = new Time(9, 0);
scriptTest25_1.text = '아베 전 총리는 일본 역사상 가장 젊은 나이에 총리 자리에 올라서 가장 오래 권력을 잡았던 인물입니다.';
let scriptTest25_2 = new Script();
scriptTest25_2.startTime = new Time(9, 0);
scriptTest25_2.endTime = new Time(22, 30);
scriptTest25_2.text = '일본 우익의 상징으로 총리에서 물러난 뒤에도 막강한 영향력을 행사했던 아베 전 총리는 야스쿠니 심사 참배를 놓고 우리 과거사 문제를 놓고 우리와는 자주 부딪혔던 정치인이기도 합니다.';
let scriptTest25_3 = new Script();
scriptTest25_3.startTime = new Time(22, 30);
scriptTest25_3.endTime = new Time(27, 27);
scriptTest25_3.text = '앞으로 일본 사회에 변화가 있을지는 정형태 기자가 짚어봤습니다.';

// 26번 뉴스
let tagTest26_1 = new Tag();
tagTest26_1.name = '정준영';
let tagTest26_2 = new Tag();
tagTest26_2.name = '최종훈';
let tagTest26_3 = new Tag();
tagTest26_3.name = '성폭행';

let scriptTest26_1 = new Script();
scriptTest26_1.startTime = new Time(0, 0);
scriptTest26_1.endTime = new Time(9, 25);
scriptTest26_1.text = '술에 취한 여성을 집단 성폭행하고 또 영상을 찍어서 퍼뜨린 혐의를 받는 가수 정준영 씨에게 법원이 징역 6년을 선고했습니다.';
let scriptTest26_2 = new Script();
scriptTest26_2.startTime = new Time(9, 25);
scriptTest26_2.endTime = new Time(13, 34);
scriptTest26_2.text = '또 가수 최종훈 씨에게도 징역 5년이 선고됐습니다.';
let scriptTest26_3 = new Script();
scriptTest26_3.startTime = new Time(13, 34);
scriptTest26_3.endTime = new Time(21, 20);
scriptTest26_3.text = '법원은 사회적 책임을 다해야 할 유명 연예인들이 여성을 성적 쾌락의 도구로 여겼다며 중형을 선고했습니다.';
let scriptTest26_4 = new Script();
scriptTest26_4.startTime = new Time(21, 20);
scriptTest26_4.endTime = new Time(23, 87);
scriptTest26_4.text = '안상우 기자입니다.';

// 27번 뉴스
let tagTest27_1 = new Tag();
tagTest27_1.name = '영화배우';
let tagTest27_2 = new Tag();
tagTest27_2.name = '강수연';
let tagTest27_3 = new Tag();
tagTest27_3.name = '심정지';

let scriptTest27_1 = new Script();
scriptTest27_1.startTime = new Time(0, 0);
scriptTest27_1.endTime = new Time(4, 65);
scriptTest27_1.text = '영화배우 강수연 씨가 심정지 상태로 병원에 옮겨졌습니다.';
let scriptTest27_2 = new Script();
scriptTest27_2.startTime = new Time(4, 65);
scriptTest27_2.endTime = new Time(13, 70);
scriptTest27_2.text = '강 씨는 오늘 오후 5시 50분쯤, 서울 강남구 자택에서 통증을 호소하다 심정지 상태로 소방 구조대에 의해 인근 병원으로 이송됐습니다.';
let scriptTest27_3 = new Script();
scriptTest27_3.startTime = new Time(13, 70);
scriptTest27_3.endTime = new Time(17, 86);
scriptTest27_3.text = '강 씨는 현재 의식이 없는 상태에서 치료를 받고 있는 것으로 전해졌습니다.';
let scriptTest27_4 = new Script();
scriptTest27_4.startTime = new Time(17, 86);
scriptTest27_4.endTime = new Time(29, 56);
scriptTest27_4.text = '올해 55살인 강 씨는 만 4살에 아역 배우로 데뷔한 뒤 영화 \'씨받이\'로 1987년 베니스 국제 영화제 여우주연상을 받는 등 대한민국을 대표하는 배우로 활약해왔습니다.';

// 28번 뉴스
let tagTest28_1 = new Tag();
tagTest28_1.name = '항공권';
let tagTest28_2 = new Tag();
tagTest28_2.name = '환불';
let tagTest28_3 = new Tag();
tagTest28_3.name = '수수료';

let scriptTest28_1 = new Script();
scriptTest28_1.startTime = new Time(0, 0);
scriptTest28_1.endTime = new Time(4, 65);
scriptTest28_1.text = '지난달 국제선 탑승객이 120만 명을 넘어섰습니다.';
let scriptTest28_2 = new Script();
scriptTest28_2.startTime = new Time(4, 65);
scriptTest28_2.endTime = new Time(9, 81);
scriptTest28_2.text = '코로나19로 발이 묶였던 지난해와 비교하면 5배 넘게 급증한 겁니다.';
let scriptTest28_3 = new Script();
scriptTest28_3.startTime = new Time(9, 81);
scriptTest28_3.endTime = new Time(15, 83);
scriptTest28_3.text = '점차 국제선 항공편이 회복된다는 소식에 표 구하는 사람도 빠르게 느는 모습입니다.';
let scriptTest28_4 = new Script();
scriptTest28_4.startTime = new Time(15, 83);
scriptTest28_4.endTime = new Time(26, 41);
scriptTest28_4.text = '하지만 항공편 늘어나는 속도는 수요를 못 따라가고, 여기에 고유가로 유류 할증료까지 올라 항공권 가격은 말 그대로 하늘 높은 줄 모릅니다.';
let scriptTest28_5 = new Script();
scriptTest28_5.startTime = new Time(26, 41);
scriptTest28_5.endTime = new Time(39, 24);
scriptTest28_5.text = '조금이라도 부담을 덜어볼까, 온라인 해외 사이트에서 직접 표를 사는 소비자들도 적지 않은데 운항 일정이 일방적으로 바뀌어도 환불이나 취소가 까다로워서 각별한 주의가 필요합니다.';
let scriptTest28_6 = new Script();
scriptTest28_6.startTime = new Time(39, 24);
scriptTest28_6.endTime = new Time(41, 41);
scriptTest28_6.text = '최은진 기자가 보도합니다.';

// 29번 뉴스
let tagTest29_1 = new Tag();
tagTest29_1.name = '윤석열';
let tagTest29_2 = new Tag();
tagTest29_2.name = '삼부토건';
let tagTest29_3 = new Tag();
tagTest29_3.name = '봐주기의혹';

let scriptTest29_1 = new Script();
scriptTest29_1.startTime = new Time(0, 0);
scriptTest29_1.endTime = new Time(5, 13);
scriptTest29_1.text = '윤석열 후보와 가까운 사이로 알려진 조남욱 전 삼부토건 회장.';
let scriptTest29_2 = new Script();
scriptTest29_2.startTime = new Time(5, 13);
scriptTest29_2.endTime = new Time(9, 25);
scriptTest29_2.text = '그의 후계자인 둘째 아들의 말이 공개가 되면서 논란이 일고 있는데요.';
let scriptTest29_3 = new Script();
scriptTest29_3.startTime = new Time(9, 25);
scriptTest29_3.endTime = new Time(12, 35);
scriptTest29_3.text = '윤석열 총장한테 세 번이나 걸렸다.';
let scriptTest29_4 = new Script();
scriptTest29_4.startTime = new Time(12, 35);
scriptTest29_4.endTime = new Time(14, 71);
scriptTest29_4.text = '아버지가 봐달라고 난리 쳤다.';
let scriptTest29_5 = new Script();
scriptTest29_5.startTime = new Time(14, 71);
scriptTest29_5.endTime = new Time(23, 21);
scriptTest29_5.text = '과거 윤 후보의 검사 시절 삼부토건이 검찰 수사를 번번이 빠져나갔던 배경으로 의심되는 봐주기 의혹이 짙어지고 있습니다.';
let scriptTest29_6 = new Script();
scriptTest29_6.startTime = new Time(23, 21);
scriptTest29_6.endTime = new Time(25, 12);
scriptTest29_6.text = '이재욱 기자가 취재했습니다.';

// 30번 뉴스
let tagTest30_1 = new Tag();
tagTest30_1.name = '물가';
let tagTest30_2 = new Tag();
tagTest30_2.name = '월급';
let tagTest30_3 = new Tag();
tagTest30_3.name = '중산층';

let scriptTest30_1 = new Script();
scriptTest30_1.startTime = new Time(0, 0);
scriptTest30_1.endTime = new Time(8, 91);
scriptTest30_1.text = '경기침체 공포에도 방금 전해드린 대로 미국 연준이 금리를 올리겠다는 의지를 가지는 건 그만큼 물가상승 폭이 크기 때문입니다.';
let scriptTest30_2 = new Script();
scriptTest30_2.startTime = new Time(8, 91);
scriptTest30_2.endTime = new Time(16, 74);
scriptTest30_2.text = '이 정도로 물가는 뛰는데 월급은 그만큼 오르지 않아서 중산층은 실질소득이 오히려 줄어든 것으로 나타났습니다.';
let scriptTest30_3 = new Script();
scriptTest30_3.startTime = new Time(16, 74);
scriptTest30_3.endTime = new Time(22, 43);
scriptTest30_3.text = '당장 월급 올려달라는 요구가 거센데 정부가 물가가 더 오를까 봐 자제를 요청하고 있습니다.';
let scriptTest30_4 = new Script();
scriptTest30_4.startTime = new Time(22, 43);
scriptTest30_4.endTime = new Time(24, 3);
scriptTest30_4.text = '정혜진 기자입니다.';

// 31번 뉴스
let tagTest31_1 = new Tag();
tagTest31_1.name = '미국';
let tagTest31_2 = new Tag();
tagTest31_2.name = '시위';
let tagTest31_3 = new Tag();
tagTest31_3.name = '트럼프';

let scriptTest31_1 = new Script();
scriptTest31_1.startTime = new Time(0, 0);
scriptTest31_1.endTime = new Time(9, 26);
scriptTest31_1.text = '흑인 남성 \'조지 플로이드\'가 백인 경찰의 강압적인 체포 과정에서 숨진 사건에 대한 항의 시위가 미국 전역에서 8일째 이어지고 있습니다.';
let scriptTest31_2 = new Script();
scriptTest31_2.startTime = new Time(9, 26);
scriptTest31_2.endTime = new Time(17, 6);
scriptTest31_2.text = '수도 워싱턴 DC에 주 방위군 1500명이 추가로 투입될 예정인 가운데 트럼프 대통령은 강경 대응 방침을 굽히지 않고 있습니다.';
let scriptTest31_3 = new Script();
scriptTest31_3.startTime = new Time(17, 6);
scriptTest31_3.endTime = new Time(22, 19);
scriptTest31_3.text = '이번 시위로 지금까지 체포된 사람은 5600명이 넘고 부상자가 속출하고 있습니다.';
let scriptTest31_4 = new Script();
scriptTest31_4.startTime = new Time(22, 19);
scriptTest31_4.endTime = new Time(31, 18);
scriptTest31_4.text = '전쟁터를 방불케 하는 상황이 곳곳에서 펼쳐지고 있습니다. 워싱턴과 뉴욕, LA 등 주요 도시에는 야간 통행 금지령이 계속해서 내려졌습니다.';
let scriptTest31_5 = new Script();
scriptTest31_5.startTime = new Time(31, 18);
scriptTest31_5.endTime = new Time(34, 7);
scriptTest31_5.text = '워싱턴에서 임종주 특파원이 소식 전해왔습니다.';

// 32번 뉴스
let tagTest32_1 = new Tag();
tagTest32_1.name = '경제성장률';
let tagTest32_2 = new Tag();
tagTest32_2.name = '불황';
let tagTest32_3 = new Tag();
tagTest32_3.name = '경제';

let scriptTest32_1 = new Script();
scriptTest32_1.startTime = new Time(0, 0);
scriptTest32_1.endTime = new Time(8, 95);
scriptTest32_1.text = '어느 정도 경제 발전을 이룬 나라가 계속해서 몇 퍼센트씩 높은 경제 성장률을 유지하기는 사실 쉽지는 않습니다.';
let scriptTest32_2 = new Script();
scriptTest32_2.startTime = new Time(8, 95);
scriptTest32_2.endTime = new Time(16, 56);
scriptTest32_2.text = '그렇다고 해도 갈수록 경제 활력이 떨어지고 또 경기가 부진한 지금 상황은 심각하게 볼 필요가 있습니다.';
let scriptTest32_3 = new Script();
scriptTest32_3.startTime = new Time(16, 56);
scriptTest32_3.endTime = new Time(21, 7);
scriptTest32_3.text = '박민하 기자가 우리 경제의 문제점과 그 해법까지 함께 짚어봤습니다.';

// 33번 뉴스
let tagTest33_1 = new Tag();
tagTest33_1.name = '필리핀';
let tagTest33_2 = new Tag();
tagTest33_2.name = '대선';
let tagTest33_3 = new Tag();
tagTest33_3.name = '독재';

let scriptTest33_1 = new Script();
scriptTest33_1.startTime = new Time(0, 0);
scriptTest33_1.endTime = new Time(8, 43);
scriptTest33_1.text = '필리핀에서 20여 년 동안 독재와 부정 축재를 일삼다 쫓겨난 마르코스 이멜다 부부, 기억하시는지요.';
let scriptTest33_2 = new Script();
scriptTest33_2.startTime = new Time(8, 43);
scriptTest33_2.endTime = new Time(13, 35);
scriptTest33_2.text = '이멜다가 다시 필리핀 대통령궁으로 들어갈 가능성이 높아지고 있습니다.';
let scriptTest33_3 = new Script();
scriptTest33_3.startTime = new Time(13, 35);
scriptTest33_3.endTime = new Time(20, 78);
scriptTest33_3.text = '그녀의 아들 \'봉봉 마르코스 주니어\'가 오는 5월에 있을 필리핀 대선에서 유력한 주자로 꼽히고 있습니다.';
let scriptTest33_4 = new Script();
scriptTest33_4.startTime = new Time(20, 78);
scriptTest33_4.endTime = new Time(22, 81);
scriptTest33_4.text = '방콕 김원장 특파원입니다.';

// 34번 뉴스
let tagTest34_1 = new Tag();
tagTest34_1.name = '완도실종';
let tagTest34_2 = new Tag();
tagTest34_2.name = '일가족';
let tagTest34_3 = new Tag();
tagTest34_3.name = '부검';

let scriptTest34_1 = new Script();
scriptTest34_1.startTime = new Time(0, 0);
scriptTest34_1.endTime = new Time(11, 6);
scriptTest34_1.text = '전남 완도 앞바다에서 숨진 채 발견된 조유나 양 일가족 3명의 정확한 사망 원인을 밝히기 위해 경찰이 1차 부검을 진행한 결과 \'사인 불명\'으로 나왔습니다.';
let scriptTest34_2 = new Script();
scriptTest34_2.startTime = new Time(11, 6);
scriptTest34_2.endTime = new Time(20, 85);
scriptTest34_2.text = '광주 남부경찰서는 국립과학수사연구원으로부터 사인은 불명이지만 익사 가능성을 배제할 수 없다는 1차 부검 결과를 통보받았다고 밝혔습니다. ';
let scriptTest34_3 = new Script();
scriptTest34_3.startTime = new Time(20, 85);
scriptTest34_3.endTime = new Time(29, 0);
scriptTest34_3.text = '경찰은 정확한 사인 파악을 위해 정밀 검사를 의뢰했고 최종 결과가 나오려면 한 달가량 걸릴 것으로 보입니다.';

// 35번 뉴스
let tagTest35_1 = new Tag();
tagTest35_1.name = '허준이';
let tagTest35_2 = new Tag();
tagTest35_2.name = '필즈상';
let tagTest35_3 = new Tag();
tagTest35_3.name = '수학자';

let scriptTest35_1 = new Script();
scriptTest35_1.startTime = new Time(0, 0);
scriptTest35_1.endTime = new Time(3, 25);
scriptTest35_1.text = '오늘 반가운 소식이 하나 전해졌습니다.';
let scriptTest35_2 = new Script();
scriptTest35_2.startTime = new Time(3, 25);
scriptTest35_2.endTime = new Time(8, 70);
scriptTest35_2.text = '수학계에서 가장 권위 있는 상으로 수학계 노벨상이라고 불리는 필즈상.';
let scriptTest35_3 = new Script();
scriptTest35_3.startTime = new Time(8, 70);
scriptTest35_3.endTime = new Time(16, 47);
scriptTest35_3.text = '미국 프린스턴 대학의 교수이자 한국 고등과학원의 석학 교수인 허준이 교수가 수상자로 선정이 됐습니다.';
let scriptTest35_4 = new Script();
scriptTest35_4.startTime = new Time(16, 47);
scriptTest35_4.endTime = new Time(22, 95);
scriptTest35_4.text = '한국계 수학자로서는 첫 수상인데 한국 수학의 발전을 보여준 쾌거라고 할 수 있겠습니다.';
let scriptTest35_5 = new Script();
scriptTest35_5.startTime = new Time(22, 95);
scriptTest35_5.endTime = new Time(25, 49);
scriptTest35_5.text = '먼저 박소희 기자가 전해드리겠습니다.';

// 36번 뉴스
let tagTest36_1 = new Tag();
tagTest36_1.name = '오징어게임';
let tagTest36_2 = new Tag();
tagTest36_2.name = '오일남';
let tagTest36_3 = new Tag();
tagTest36_3.name = '골든글로브';

let scriptTest36_1 = new Script();
scriptTest36_1.startTime = new Time(0, 0);
scriptTest36_1.endTime = new Time(8, 23);
scriptTest36_1.text = '깐부 할아버지로 잘 알려진 배우 오영수 씨가 드라마 \'오징어 게임\'으로 한국 배우 최초로 미국 골든글로브 연기상을 수상했습니다.';
let scriptTest36_2 = new Script();
scriptTest36_2.startTime = new Time(8, 23);
scriptTest36_2.endTime = new Time(12, 56);
scriptTest36_2.text = '오 씨가 수상한 부문은 골든글로브 TV 드라마 남우조연상입니다.';
let scriptTest36_3 = new Script();
scriptTest36_3.startTime = new Time(12, 56);
scriptTest36_3.endTime = new Time(20, 4);
scriptTest36_3.text = 'TV 드라마 남우주연상은 석세션의 제레미 스트롱에게 돌아가서 후보에 오른 이정재 씨의 수상은 불발됐습니다.';
let scriptTest36_4 = new Script();
scriptTest36_4.startTime = new Time(20, 4);
scriptTest36_4.endTime = new Time(30, 0);
scriptTest36_4.text = '오징어게임은 456억 원의 상금을 차지하기 위해서 목숨을 걸고 벌이는 서바이벌 게임을 그린 드라마로 오 씨는 게임 참가자 오일남 역을 맡았습니다.';

// 37번 뉴스
let tagTest37_1 = new Tag();
tagTest37_1.name = '커피콩';
let tagTest37_2 = new Tag();
tagTest37_2.name = '부가가치세';
let tagTest37_3 = new Tag();
tagTest37_3.name = '수입';

let scriptTest37_1 = new Script();
scriptTest37_1.startTime = new Time(10, 33);
scriptTest37_1.endTime = new Time(13, 97);
scriptTest37_1.text = '화제의 경제 뉴스를 빠르게 전해드리는 신선한 경제 시간입니다.';
let scriptTest37_2 = new Script();
scriptTest37_2.startTime = new Time(13, 97);
scriptTest37_2.endTime = new Time(22, 98);
scriptTest37_2.text = '커피콩이라고 하죠. 커피 생두에 붙이던 수입 부가가치세 10%를 면제하기로 하면서 커피 가격도 내릴까 기대가 큰데요.';
let scriptTest37_3 = new Script();
scriptTest37_3.startTime = new Time(22, 98);
scriptTest37_3.endTime = new Time(25, 39);
scriptTest37_3.text = '과연 내려갈까요?';
let scriptTest37_4 = new Script();
scriptTest37_4.startTime = new Time(25, 39);
scriptTest37_4.endTime = new Time(35, 52);
scriptTest37_4.text = '국내 커피 생두의 25%를 수입하는 동서식품은 이미 생두 가격이 2년 새 2배나 오른 상황이라 가격을 내릴 계획이 없다고 밝혔습니다.';
let scriptTest37_5 = new Script();
scriptTest37_5.startTime = new Time(35, 52);
scriptTest37_5.endTime = new Time(43, 77);
scriptTest37_5.text = '인하 방침을 밝힌 수입업체도 있긴 하지만 통관부터 배송까지 걸리는 시간을 감안하면 두 달 뒤에야 효과가 나타날 것으로 보이고요.';
let scriptTest37_6 = new Script();
scriptTest37_6.startTime = new Time(43, 77);
scriptTest37_6.endTime = new Time(55, 53);
scriptTest37_6.text = '이들 업체로부터 생두를 구매하는 카페들이 커피 가격을 내려야 소비자들이 혜택을 볼 텐데 임대료와 인건비 부담이 많이 늘어난 상황이라 실제 가격 인하로 이어질지는 미지수입니다.';
let scriptTest37_7 = new Script();
scriptTest37_7.startTime = new Time(55, 53);
scriptTest37_7.endTime = new Time(65, 34);
scriptTest37_7.text = '또 카페 프랜차이즈 1위 업체인 스타벅스 코리아는 생두 대신 볶은 원두를 수입해 부가세 면제 혜택을 볼 수 없다고 하네요.';

// 38번 뉴스
let tagTest38_1 = new Tag();
tagTest38_1.name = '현대자동차';
let tagTest38_2 = new Tag();
tagTest38_2.name = '디자이너';
let tagTest38_3 = new Tag();
tagTest38_3.name = '과로자살';

let scriptTest38_1 = new Script();
scriptTest38_1.startTime = new Time(0, 0);
scriptTest38_1.endTime = new Time(5, 33);
scriptTest38_1.text = '현대자동차 남양연구소는 현대차의 심장 같은 곳입니다.';
let scriptTest38_2 = new Script();
scriptTest38_2.startTime = new Time(5, 33);
scriptTest38_2.endTime = new Time(12, 32);
scriptTest38_2.text = '1년 4개월 전 이 연구소 디자인 센터의 한 팀장급 직원이 스스로 생을 정리했습니다.';
let scriptTest38_3 = new Script();
scriptTest38_3.startTime = new Time(12, 32);
scriptTest38_3.endTime = new Time(19, 41);
scriptTest38_3.text = 'MBC는 고인이 남긴 기록, 유가족과 여러 동료의 증언 그리고 회사의 입장을 취재했습니다.';
let scriptTest38_4 = new Script();
scriptTest38_4.startTime = new Time(19, 41);
scriptTest38_4.endTime = new Time(25, 44);
scriptTest38_4.text = '그 결과 이 죽음이 개인의 선택을 넘어 사회적 죽음이라고 판단하기로 했습니다.';
let scriptTest38_5 = new Script();
scriptTest38_5.startTime = new Time(25, 44);
scriptTest38_5.endTime = new Time(31, 43);
scriptTest38_5.text = '우리에게는 아직 생소한 과로 자살. 차주혁 기자의 보도로 시작합니다.';

// 39번 뉴스
let tagTest39_1 = new Tag();
tagTest39_1.name = '통일부';
let tagTest39_2 = new Tag();
tagTest39_2.name = '북한';
let tagTest39_3 = new Tag();
tagTest39_3.name = '어민';

let scriptTest39_1 = new Script();
scriptTest39_1.startTime = new Time(0, 0);
scriptTest39_1.endTime = new Time(9, 85);
scriptTest39_1.text = '2019년 11월 북한 어민 2명이 북송된 사건과 관련해 통일부가 당시 잘못된 부분이 있었다는 입장을 밝혔습니다. ';
let scriptTest39_2 = new Script();
scriptTest39_2.startTime = new Time(9, 85);
scriptTest39_2.endTime = new Time(15, 55);
scriptTest39_2.text = '헌법상 대한민국 국민인 탈북 어민들이 적절한 조치를 받지 못했다는 건데요.';
let scriptTest39_3 = new Script();
scriptTest39_3.startTime = new Time(15, 55);
scriptTest39_3.endTime = new Time(22, 64);
scriptTest39_3.text = '검찰 수사가 시작된 가운데 당시 어민들의 귀순 의사에 진정성이 있었는지가 쟁점이 될 것으로 보입니다.';
let scriptTest39_4 = new Script();
scriptTest39_4.startTime = new Time(22, 64);
scriptTest39_4.endTime = new Time(24, 9);
scriptTest39_4.text = '김수연 기자입니다.';

// 40번 뉴스
let tagTest40_1 = new Tag();
tagTest40_1.name = '이은해';
let tagTest40_2 = new Tag();
tagTest40_2.name = '조현수';
let tagTest40_3 = new Tag();
tagTest40_3.name = '보험사기';

let scriptTest40_1 = new Script();
scriptTest40_1.startTime = new Time(0, 0);
scriptTest40_1.endTime = new Time(7, 15);
scriptTest40_1.text = '3년 전 수영을 못하는 한 30대 남성이 계곡에서 다이빙을 하다가 숨진 사건이 있었습니다.';
let scriptTest40_2 = new Script();
scriptTest40_2.startTime = new Time(7, 15);
scriptTest40_2.endTime = new Time(10, 62);
scriptTest40_2.text = '단순한 사망 사고로 끝날 뻔했던 이 사건.';
let scriptTest40_3 = new Script();
scriptTest40_3.startTime = new Time(10, 62);
scriptTest40_3.endTime = new Time(17, 21);
scriptTest40_3.text = '부인이 숨진 남편의 명의로 8억 원이 넘는 보험금을 타려고 하면서 재수사가 시작됐는데요.';
let scriptTest40_4 = new Script();
scriptTest40_4.startTime = new Time(17, 21);
scriptTest40_4.endTime = new Time(24, 24);
scriptTest40_4.text = '검찰이 숨진 남성의 부인 그리고 공범인 30대 남성을 살인 혐의로 공개 수배했습니다.';
let scriptTest40_5 = new Script();
scriptTest40_5.startTime = new Time(24, 24);
scriptTest40_5.endTime = new Time(26, 19);
scriptTest40_5.text = '차현진 기자가 취재했습니다.';

// 41번 뉴스
let tagTest41_1 = new Tag();
tagTest41_1.name = '스리랑카';
let tagTest41_2 = new Tag();
tagTest41_2.name = '국가부도';
let tagTest41_3 = new Tag();
tagTest41_3.name = '대통령사임';

let scriptTest41_1 = new Script();
scriptTest41_1.startTime = new Time(0, 0);
scriptTest41_1.endTime = new Time(4, 88);
scriptTest41_1.text = '이번에는 국가 부도 상태에 빠진 스리랑카 소식 전해드립니다.';
let scriptTest41_2 = new Script();
scriptTest41_2.startTime = new Time(4, 88);
scriptTest41_2.endTime = new Time(11, 57);
scriptTest41_2.text = '전기도 끊기고 연료도 살 수 없게 되자 분노한 국민들이 정권 퇴진을 외치며 거리로 나왔는데요.';
let scriptTest41_3 = new Script();
scriptTest41_3.startTime = new Time(11, 57);
scriptTest41_3.endTime = new Time(18, 81);
scriptTest41_3.text = '대통령 집무실과 관저를 점거한 지 하루 만에 스리랑카 대통령이 전격 사임 의사를 밝혔습니다.';
let scriptTest41_4 = new Script();
scriptTest41_4.startTime = new Time(18, 81);
scriptTest41_4.endTime = new Time(23, 33);
scriptTest41_4.text = '최악의 경제난에 이어 정치권까지 격랑에 빠지게 됐습니다.';
let scriptTest41_5 = new Script();
scriptTest41_5.startTime = new Time(23, 33);
scriptTest41_5.endTime = new Time(25, 10);
scriptTest41_5.text = '조재형 기자입니다.';

// 42번 뉴스
let tagTest42_1 = new Tag();
tagTest42_1.name = '대선';
let tagTest42_2 = new Tag();
tagTest42_2.name = '청년';
let tagTest42_3 = new Tag();
tagTest42_3.name = '가난';

let scriptTest42_1 = new Script();
scriptTest42_1.startTime = new Time(0, 0);
scriptTest42_1.endTime = new Time(6, 28);
scriptTest42_1.text = '이번 대선에서 후보들이 가장 공들이는 대상은 2030 청년세대입니다.';
let scriptTest42_2 = new Script();
scriptTest42_2.startTime = new Time(6, 28);
scriptTest42_2.endTime = new Time(19, 46);
scriptTest42_2.text = '이들 표심에 따라서 판도 자체가 확 바뀔 수 있다고 해도 과언이 아닌데, 청년들이 후보들에게 요구하는 내용, 얼마 전 청년 시민단체 38개의 합동 기자회견에 단서가 있습니다.';
let scriptTest42_3 = new Script();
scriptTest42_3.startTime = new Time(19, 46);
scriptTest42_3.endTime = new Time(37, 49);
scriptTest42_3.text = '보시는 것처럼 이대로라면 5년 뒤에는 더 엉망일 거라면서 청년의 목소리와 현실을 반영한 공약을 내놔라, 또 대선 다가올 때만 선심 쓰는 척하지 말고, 평소에도 함께 머리 맞대고, 어려움을 헤쳐 나갈 자리를 마련하자 이렇게 말했습니다.';
let scriptTest42_4 = new Script();
scriptTest42_4.startTime = new Time(37, 49);
scriptTest42_4.endTime = new Time(43, 63);
scriptTest42_4.text = '그렇다면 2030 청년들, 어떤 특징을 가지고 있고, 가장 고민하는 게 뭘까요?';
let scriptTest42_5 = new Script();
scriptTest42_5.startTime = new Time(43, 63);
scriptTest42_5.endTime = new Time(46, 24);
scriptTest42_5.text = '강병수 기자가 자세히 들여다봤습니다.';

// 43번 뉴스
let tagTest43_1 = new Tag();
tagTest43_1.name = '방탄소년단';
let tagTest43_2 = new Tag();
tagTest43_2.name = 'AMA';
let tagTest43_3 = new Tag();
tagTest43_3.name = '그래미';

let scriptTest43_1 = new Script();
scriptTest43_1.startTime = new Time(0, 0);
scriptTest43_1.endTime = new Time(11, 21);
scriptTest43_1.text = '방탄소년단 BTS가 미국의 3대 대중 음악 시상식으로 꼽히는 아메리칸 뮤직어워즈에서 대상에 해당하는 올해의 아티스트상을 받았습니다.';
let scriptTest43_2 = new Script();
scriptTest43_2.startTime = new Time(11, 21);
scriptTest43_2.endTime = new Time(19, 13);
scriptTest43_2.text = '아시아 가수가 이 상을 받은 건 사상 처음인데, 내년 초에 열릴 그래미 시상식에 대한 기대감도 높아지고 있습니다.';
let scriptTest43_3 = new Script();
scriptTest43_3.startTime = new Time(19, 13);
scriptTest43_3.endTime = new Time(21, 4);
scriptTest43_3.text = '워싱턴 김윤수 특파원입니다.';

// 44번 뉴스
let tagTest44_1 = new Tag();
tagTest44_1.name = '승리';
let tagTest44_2 = new Tag();
tagTest44_2.name = '빅뱅';
let tagTest44_3 = new Tag();
tagTest44_3.name = '성매매';

let scriptTest44_1 = new Script();
scriptTest44_1.startTime = new Time(0, 0);
scriptTest44_1.endTime = new Time(4, 76);
scriptTest44_1.text = '여러분, 안녕하십니까? 8월 12일 목요일 MBC 5시 뉴스입니다.';
let scriptTest44_2 = new Script();
scriptTest44_2.startTime = new Time(4, 76);
scriptTest44_2.endTime = new Time(18, 91);
scriptTest44_2.text = '투자 유치를 위해 외국인 투자자에게 성매매를 알선하고 20억 원대 해외 원정 도박을 한 혐의 등으로 구속된 그룹 빅뱅의 전 멤버 승리가 군사법원에서 징역 3년을 선고받고 법정 구속됐습니다.';
let scriptTest44_3 = new Script();
scriptTest44_3.startTime = new Time(18, 91);
scriptTest44_3.endTime = new Time(30, 67);
scriptTest44_3.text = '경기 용인시 소재 지사 작전사령부 보통군사법원은 오늘 성매매 알선 등 9개 혐의로 기소된 승리에게 징역 3년의 추징금 11억 5,000만 원을 선고했습니다.';
let scriptTest44_4 = new Script();
scriptTest44_4.startTime = new Time(30, 67);
scriptTest44_4.endTime = new Time(47, 14);
scriptTest44_4.text = '재판부는 승리가 전 유리홀딩스 대표 유인석과 공모해 외국인 투자자들에게 여러 차례 성매매를 알선하고 이득을 얻었다며 성을 상품화하고 풍속을 해친 피고인의 범행은 사회적 해악이 작지 않다고 밝혔습니다.';

// 45번 뉴스
let tagTest45_1 = new Tag();
tagTest45_1.name = '아이돌학교';
let tagTest45_2 = new Tag();
tagTest45_2.name = '투표조작';
let tagTest45_3 = new Tag();
tagTest45_3.name = '구속영장';

let scriptTest45_1 = new Script();
scriptTest45_1.startTime = new Time(0, 0);
scriptTest45_1.endTime = new Time(9, 80);
scriptTest45_1.text = '시청자 투표로 아이돌 가수를 뽑는 프로그램에서 그 투표 결과를 조작한 혐의로 구속된 엠넷의 제작진이 지금 재판을 받고 있습니다.';
let scriptTest45_2 = new Script();
scriptTest45_2.startTime = new Time(9, 80);
scriptTest45_2.endTime = new Time(18, 46);
scriptTest45_2.text = '그런데 같은 회사의 다른 오디션 프로그램에서도 결과를 조작했다는 정황이 드러나서 제작진 2명에 대해 구속영장이 청구됐습니다.';
let scriptTest45_3 = new Script();
scriptTest45_3.startTime = new Time(18, 46);
scriptTest45_3.endTime = new Time(20, 2);
scriptTest45_3.text = '전연남 기자입니다.';

// 46번 뉴스
let tagTest46_1 = new Tag();
tagTest46_1.name = '가상화폐';
let tagTest46_2 = new Tag();
tagTest46_2.name = '루나';
let tagTest46_3 = new Tag();
tagTest46_3.name = '권도형';

let scriptTest46_1 = new Script();
scriptTest46_1.startTime = new Time(0, 0);
scriptTest46_1.endTime = new Time(9, 58);
scriptTest46_1.text = '가상화폐인 테라, 루나의 폭락 사태 이후 우리나라와 미국 검찰이 수사에 나섰지만, 아직 이렇다 할 성과를 내지 못하고 있습니다.';
let scriptTest46_2 = new Script();
scriptTest46_2.startTime = new Time(9, 58);
scriptTest46_2.endTime = new Time(19, 6);
scriptTest46_2.text = '그러자 그 발행업체의 대표인 권도형 씨를 추적하고 또 의혹을 밝히기 위해서 가상화폐에 투자했던 사람들이 직접 나섰습니다.';
let scriptTest46_3 = new Script();
scriptTest46_3.startTime = new Time(19, 6);
scriptTest46_3.endTime = new Time(21, 33);
scriptTest46_3.text = '이 내용 김혜민 기자가 전하겠습니다.';

// 47번 뉴스
let tagTest47_1 = new Tag();
tagTest47_1.name = '북한';
let tagTest47_2 = new Tag();
tagTest47_2.name = '바이든';
let tagTest47_3 = new Tag();
tagTest47_3.name = '미사일';

let scriptTest47_1 = new Script();
scriptTest47_1.startTime = new Time(0, 0);
scriptTest47_1.endTime = new Time(9, 86);
scriptTest47_1.text = '방금 이야기한 대로 정부는 북한의 움직임을 예의주시하고 있는데 이르면 이번 주 안에 북한이 장거리 탄도미사일을 추가로 쏠 거란 관측이 나오고 있습니다.';
let scriptTest47_2 = new Script();
scriptTest47_2.startTime = new Time(9, 86);
scriptTest47_2.endTime = new Time(18, 97);
scriptTest47_2.text = '지난주 바이든 미국 대통령이 우리나라에 왔을 때 북한이 도발에 나설 수 있다는 분석도 있었는데 조용히 지나갔던 이유가 있었습니다.';
let scriptTest47_3 = new Script();
scriptTest47_3.startTime = new Time(18, 97);
scriptTest47_3.endTime = new Time(22, 0);
scriptTest47_3.text = '안정식 북한 전문기자가 그 이유를 설명해 드리겠습니다.';

// 48번 뉴스
let tagTest48_1 = new Tag();
tagTest48_1.name = '베이징올림픽';
let tagTest48_2 = new Tag();
tagTest48_2.name = '쇼트트랙';
let tagTest48_3 = new Tag();
tagTest48_3.name = '편파판정';

let scriptTest48_1 = new Script();
scriptTest48_1.startTime = new Time(0, 0);
scriptTest48_1.endTime = new Time(6, 88);
scriptTest48_1.text = '지금부터는 남자 쇼트트랙, 분노의 편파 판정 논란 자세하게 보도해드립니다.';
let scriptTest48_2 = new Script();
scriptTest48_2.startTime = new Time(6, 88);
scriptTest48_2.endTime = new Time(16, 0);
scriptTest48_2.text = '왜 하필 중국 선수 앞에 섰다가 실격이 되고 그래서 맨 먼저 들어오지도 않은 중국 선수가 결국 금메달을 목에 걸었는지.';
let scriptTest48_3 = new Script();
scriptTest48_3.startTime = new Time(16, 0);
scriptTest48_3.endTime = new Time(25, 80);
scriptTest48_3.text = '심판의 판정이라는 절차적 이유만 앞세울 게 아니라 그 한참 위에 있는 올림픽 정신에 부끄럽지 않은 답이 나와야 할 겁니다.';
let scriptTest48_4 = new Script();
scriptTest48_4.startTime = new Time(25, 80);
scriptTest48_4.endTime = new Time(32, 28);
scriptTest48_4.text = '한국 팀은 황당한 편파 판정을 국제스포츠중재재판소에 제소하기로 했습니다.';
let scriptTest48_5 = new Script();
scriptTest48_5.startTime = new Time(32, 28);
scriptTest48_5.endTime = new Time(39, 16);
scriptTest48_5.text = '먼저 바람만 스쳐도 실격될 거라는 우려가 현실이 된 과정을 이명노 기자가 보도합니다.';

// 49번 뉴스
let tagTest49_1 = new Tag();
tagTest49_1.name = '농협';
let tagTest49_2 = new Tag();
tagTest49_2.name = '직원';
let tagTest49_3 = new Tag();
tagTest49_3.name = '횡령';

let scriptTest49_1 = new Script();
scriptTest49_1.startTime = new Time(0, 0);
scriptTest49_1.endTime = new Time(6, 57);
scriptTest49_1.text = '농협 직원이 도박 손실을 막으려고 회삿돈 40억 원을 횡령했다는 사건, YTN이 단독으로 전해드렸죠.';
let scriptTest49_2 = new Script();
scriptTest49_2.startTime = new Time(6, 57);
scriptTest49_2.endTime = new Time(11, 3);
scriptTest49_2.text = '이 농협 직원은 복권을 사는 데도 10억 원 넘게 쓴 거로 알려졌습니다.';
let scriptTest49_3 = new Script();
scriptTest49_3.startTime = new Time(11, 33);
scriptTest49_3.endTime = new Time(19, 49);
scriptTest49_3.text = '그런데 YTN 취재 결과 복권을 대신 사달라는 부탁을 받은 복권방 사장이 횡령금을 몰래 빼돌렸을 가능성이 새롭게 제기됐습니다.';
let scriptTest49_4 = new Script();
scriptTest49_4.startTime = new Time(19, 49);
scriptTest49_4.endTime = new Time(23, 63);
scriptTest49_4.text = '경찰도 수사 범위를 확대해 복권방과 사무실을 압수수색 했습니다.';
let scriptTest49_5 = new Script();
scriptTest49_5.startTime = new Time(23, 63);
scriptTest49_5.endTime = new Time(27, 59);
scriptTest49_5.text = '취재기자 연결해 자세한 내용 알아보겠습니다. 강민경 기자!';

// 50번 뉴스
let tagTest50_1 = new Tag();
tagTest50_1.name = '연세대';
let tagTest50_2 = new Tag();
tagTest50_2.name = '청소노동자';
let tagTest50_3 = new Tag();
tagTest50_3.name = '손해배상';

let scriptTest50_1 = new Script();
scriptTest50_1.startTime = new Time(0, 0);
scriptTest50_1.endTime = new Time(7, 9);
scriptTest50_1.text = '연세대학교 청소 노동자들이 근로 조건을 개선해달라며, 넉 달째 집회를 이어가고 있습니다.';
let scriptTest50_2 = new Script();
scriptTest50_2.startTime = new Time(7, 9);
scriptTest50_2.endTime = new Time(14, 73);
scriptTest50_2.text = '그런데, 몇몇 학생들이 집회 소음으로 수업권이 침해됐다며 소송을 제기해 논란이 커지고 있습니다.';
let scriptTest50_3 = new Script();
scriptTest50_3.startTime = new Time(14, 73);
scriptTest50_3.endTime = new Time(20, 70);
scriptTest50_3.text = '이 학생들에 대한 비판도 나오는 가운데 문제를 풀어야 할 학교는 침묵하고 있습니다.';
let scriptTest50_4 = new Script();
scriptTest50_4.startTime = new Time(20, 70);
scriptTest50_4.endTime = new Time(22, 75);
scriptTest50_4.text = '김성수 기잡니다.';

// 51번 뉴스
let tagTest51_1 = new Tag();
tagTest51_1.name = '코로나19';
let tagTest51_2 = new Tag();
tagTest51_2.name = '재확산';
let tagTest51_3 = new Tag();
tagTest51_3.name = 'BA5변이';

let scriptTest51_1 = new Script();
scriptTest51_1.startTime = new Time(0, 0);
scriptTest51_1.endTime = new Time(5, 93);
scriptTest51_1.text = '3년 만에 즐기는 시원한 물놀이에 본격적인 휴가철도 이제 시작됐죠.';
let scriptTest51_2 = new Script();
scriptTest51_2.startTime = new Time(5, 93);
scriptTest51_2.endTime = new Time(10, 63);
scriptTest51_2.text = '그동안 타격이 컸던 관광업계는 올여름 기대를 좀 하고 있을 텐데요.';
let scriptTest51_3 = new Script();
scriptTest51_3.startTime = new Time(10, 63);
scriptTest51_3.endTime = new Time(15, 95);
scriptTest51_3.text = 'BA.5 변이로 인한 코로나 재유행이 발목을 잡는 모양새입니다.';
let scriptTest51_4 = new Script();
scriptTest51_4.startTime = new Time(15, 95);
scriptTest51_4.endTime = new Time(26, 26);
scriptTest51_4.text = '신규 확진자가 하루 2만 명을 넘어섰는데 정부는 재유행이 예상보다 더 빨리 찾아왔다고 판단하고 다음 주 새 방역 대책을 발표하기로 했습니다.';
let scriptTest51_5 = new Script();
scriptTest51_5.startTime = new Time(26, 26);
scriptTest51_5.endTime = new Time(28, 14);
scriptTest51_5.text = '양소연 기자가 보도합니다.';

// 52번 뉴스
let tagTest52_1 = new Tag();
tagTest52_1.name = '이준석';
let tagTest52_2 = new Tag();
tagTest52_2.name = '국민의힘';
let tagTest52_3 = new Tag();
tagTest52_3.name = '사퇴압박';

let scriptTest52_1 = new Script();
scriptTest52_1.startTime = new Time(0, 0);
scriptTest52_1.endTime = new Time(7, 72);
scriptTest52_1.text = '국민의힘 이준석 대표에 대한 당 윤리위의 중징계 결정 이후 이 대표의 잠행은 오늘도 계속되고 있는데요.';
let scriptTest52_2 = new Script();
scriptTest52_2.startTime = new Time(7, 72);
scriptTest52_2.endTime = new Time(12, 21);
scriptTest52_2.text = ' 당 내부에서는 앞으로 당 대표 직무 대행 체제로 가야 한다.';
let scriptTest52_3 = new Script();
scriptTest52_3.startTime = new Time(12, 21);
scriptTest52_3.endTime = new Time(18, 2);
scriptTest52_3.text = '아니다. 대표직을 사퇴하고 조기 전당대회를 여는 게 맞다 의견이 갈리고 있습니다.';
let scriptTest52_4 = new Script();
scriptTest52_4.startTime = new Time(18, 2);
scriptTest52_4.endTime = new Time(23, 88);
scriptTest52_4.text = '국민의힘은 내일 의원총회 등을 통해 당 수습 방안을 논의할 예정인데 격론이 예상됩니다.';
let scriptTest52_5 = new Script();
scriptTest52_5.startTime = new Time(23, 88);
scriptTest52_5.endTime = new Time(25, 31);
scriptTest52_5.text = '김민찬 기자입니다.';

// 53번 뉴스
let tagTest53_1 = new Tag();
tagTest53_1.name = '의학';
let tagTest53_2 = new Tag();
tagTest53_2.name = '암검사';
let tagTest53_3 = new Tag();
tagTest53_3.name = '액체생검';

let scriptTest53_1 = new Script();
scriptTest53_1.startTime = new Time(0, 0);
scriptTest53_1.endTime = new Time(6, 50);
scriptTest53_1.text = '\'암 검사\' 하면 조직 일부를 떼어 검사하는 조직생검을 떠올리실 텐데요.';
let scriptTest53_2 = new Script();
scriptTest53_2.startTime = new Time(6, 50);
scriptTest53_2.endTime = new Time(10, 27);
scriptTest53_2.text = '이제는 피 검사로도 암을 진단할 수 있다고 합니다.';
let scriptTest53_3 = new Script();
scriptTest53_3.startTime = new Time(10, 27);
scriptTest53_3.endTime = new Time(16, 42);
scriptTest53_3.text = '\'액체생검\'이라고 하는데, 보다 빠르고 간편해서 차세대 진단법으로 주목받고 있습니다.';
let scriptTest53_4 = new Script();
scriptTest53_4.startTime = new Time(16, 42);
scriptTest53_4.endTime = new Time(18, 86);
scriptTest53_4.text = '이충헌 의학 전문기자의 보돕니다.';

// 54번 뉴스
let tagTest54_1 = new Tag();
tagTest54_1.name = 'BA';
let tagTest54_2 = new Tag();
tagTest54_2.name = '변이';
let tagTest54_3 = new Tag();
tagTest54_3.name = '코로나19';

let scriptTest54_1 = new Script();
scriptTest54_1.startTime = new Time(0, 0);
scriptTest54_1.endTime = new Time(1, 71);
scriptTest54_1.text = '여러분, 안녕하십니까.';
let scriptTest54_2 = new Script();
scriptTest54_2.startTime = new Time(1, 71);
scriptTest54_2.endTime = new Time(11, 36);
scriptTest54_2.text = '코로나 환자 숫자가 일주일 전보다 2배씩 늘어나는 현상이 열흘 넘게 이어지고 있는데 걱정스러운 소식이 하나 더 있습니다.';
let scriptTest54_3 = new Script();
scriptTest54_3.startTime = new Time(11, 36);
scriptTest54_3.endTime = new Time(19, 90);
scriptTest54_3.text = '코로나 변이 가운데 전파력이 가장 강하다고 알려진 새 변이에 감염된 사람이 우리나라에서도 처음 확인된 겁니다.';
let scriptTest54_4 = new Script();
scriptTest54_4.startTime = new Time(19, 90);
scriptTest54_4.endTime = new Time(27, 25);
scriptTest54_4.text = '그 환자는 최근 외국에 다녀온 적도 없어서 변이가 이미 국내 다른 곳으로 퍼진 것 아니냐는 이야기도 나옵니다.';
let scriptTest54_5 = new Script();
scriptTest54_5.startTime = new Time(27, 25);
scriptTest54_5.endTime = new Time(30, 97);
scriptTest54_5.text = '오늘 첫 소식 김덕현 기자가 전하겠습니다.';

// 55번 뉴스
let tagTest55_1 = new Tag();
tagTest55_1.name = '베이징올림픽';
let tagTest55_2 = new Tag();
tagTest55_2.name = '발리예바';
let tagTest55_3 = new Tag();
tagTest55_3.name = '도핑';

let scriptTest55_1 = new Script();
scriptTest55_1.startTime = new Time(0, 0);
scriptTest55_1.endTime = new Time(3, 96);
scriptTest55_1.text = '전 세계의 주목을 받고 있는 피겨 스타죠.';
let scriptTest55_2 = new Script();
scriptTest55_2.startTime = new Time(3, 96);
scriptTest55_2.endTime = new Time(9, 63);
scriptTest55_2.text = '러시아의 발리예바 선수가 금지 약물을 사용했다는 의혹이 사실로 드러났습니다.';
let scriptTest55_3 = new Script();
scriptTest55_3.startTime = new Time(9, 63);
scriptTest55_3.endTime = new Time(14, 34);
scriptTest55_3.text = '올림픽위원회가 공식 발표와 함께 긴급 청문회를 요청했는데요.';
let scriptTest55_4 = new Script();
scriptTest55_4.startTime = new Time(14, 34);
scriptTest55_4.endTime = new Time(22, 20);
scriptTest55_4.text = '결과에 따라서 단체전 금메달이 박탈되는 건 물론이고 여자 싱글 경기에도 나서지 못하게 될 수 있습니다.';
let scriptTest55_5 = new Script();
scriptTest55_5.startTime = new Time(22, 20);
scriptTest55_5.endTime = new Time(25, 28);
scriptTest55_5.text = '손병산 기자가 취재했습니다.';

// 56번 뉴스
let tagTest56_1 = new Tag();
tagTest56_1.name = '스포츠';
let tagTest56_2 = new Tag();
tagTest56_2.name = '테니스';
let tagTest56_3 = new Tag();
tagTest56_3.name = '나달';

let scriptTest56_1 = new Script();
scriptTest56_1.startTime = new Time(0, 0);
scriptTest56_1.endTime = new Time(7, 75);
scriptTest55_1.text = '여기저기 반창고를 붙인 손으로 힘을 실어 보낸 서브, 공을 바라보던 나달은 붉은 코트에 그대로 주저앉았습니다.';
let scriptTest56_2 = new Script();
scriptTest56_2.startTime = new Time(7, 75);
scriptTest56_2.endTime = new Time(11, 7);
scriptTest56_2.text = '세계 1·2위의 대결은 이렇게 끝났습니다.';
let scriptTest56_3 = new Script();
scriptTest56_3.startTime = new Time(11, 7);
scriptTest56_3.endTime = new Time(23, 15);
scriptTest56_3.text = '15년 전, 열아홉 살 나이로 처음 프랑스 오픈 트로피를 들어 올린 뒤, 이 대회에서만 열세 번째 우승한 나달은 메이저 대회 20승 고지에도 올라서 라이벌 페더러와 어깨를 나란히 했습니다.';
let scriptTest56_4 = new Script();
scriptTest56_4.startTime = new Time(23, 15);
scriptTest56_4.endTime = new Time(24, 75);
scriptTest56_4.text = '최하은 기자입니다.';

// 57번 뉴스
let tagTest57_1 = new Tag();
tagTest57_1.name = '박지현';
let tagTest57_2 = new Tag();
tagTest57_2.name = '더불어민주당';
let tagTest57_3 = new Tag();
tagTest57_3.name = '당대표';

let scriptTest57_1 = new Script();
scriptTest57_1.startTime = new Time(0, 0);
scriptTest57_1.endTime = new Time(8, 44);
scriptTest57_1.text = '박지현 더불어민주당 전 공동비상대책위원장이 8월 전당대회에서 당 대표에 출마하겠다고 공식 선언했습니다.';
let scriptTest57_2 = new Script();
scriptTest57_2.startTime = new Time(8, 44);
scriptTest57_2.endTime = new Time(18, 93);
scriptTest57_2.text = '박 전 위원장은 어제 MBC 뉴스데스크에 출연해 민주당을 국민을 위한 정당, 청년의 목소리를 듣는 정당으로 만들고자 당 대표 출마를 결심했다고 밝혔습니다.';
let scriptTest57_3 = new Script();
scriptTest57_3.startTime = new Time(18, 93);
scriptTest57_3.endTime = new Time(34, 78);
scriptTest57_3.text = ' 박 전 위원장은 이재명 의원의 당 대표 출마에 대해서는 당 의원들이 계파 갈등이 보다 더 심해질 것이라고 말씀하고 계시고 분당 우려도 있다고 목소리를 높이고 계신데 거기에 동조하는 바라면서 반대 의견을 밝혔습니다.';

// 58번 뉴스
let tagTest58_1 = new Tag();
tagTest58_1.name = '코로나19';
let tagTest58_2 = new Tag();
tagTest58_2.name = '거리두기';
let tagTest58_3 = new Tag();
tagTest58_3.name = '대리운전기사';

let scriptTest58_1 = new Script();
scriptTest58_1.startTime = new Time(0, 0);
scriptTest58_1.endTime = new Time(5, 52);
scriptTest58_1.text = '수도권 거리두기 4단계로 도심의 밤거리가 말 그대로 썰렁해졌습니다.';
let scriptTest58_2 = new Script();
scriptTest58_2.startTime = new Time(5, 52);
scriptTest58_2.endTime = new Time(11, 60);
scriptTest58_2.text = '이 여파로 생계가 막막해진 사람들 중 하나가 대리 운전기사들인데요.';
let scriptTest58_3 = new Script();
scriptTest58_3.startTime = new Time(11, 60);
scriptTest58_3.endTime = new Time(16, 37);
scriptTest58_3.text = '소상공인이 아니어서 손실 보상 논의에서도 빠져있다고 합니다.​';
let scriptTest58_4 = new Script();
scriptTest58_4.startTime = new Time(16, 37);
scriptTest58_4.endTime = new Time(20, 77);
scriptTest58_4.text = '이들의 깊은 한숨, 신지수 기자가 들어봤습니다.';

// 59번 뉴스
let tagTest59_1 = new Tag();
tagTest59_1.name = '의학';
let tagTest59_2 = new Tag();
tagTest59_2.name = '의료사고';
let tagTest59_3 = new Tag();
tagTest59_3.name = '신생아';

let scriptTest59_1 = new Script();
scriptTest59_1.startTime = new Time(0, 0);
scriptTest59_1.endTime = new Time(7, 0);
scriptTest59_1.text = '분당차병원에서 의료진이 갓 태어난 신생아를 수술실 바닥에 떨어뜨려 숨지게 한 사실이 3년 만에 드러났습니다.';
let scriptTest59_2 = new Script();
scriptTest59_2.startTime = new Time(7, 0);
scriptTest59_2.endTime = new Time(15, 44);
scriptTest59_2.text = '병원에선 의료 기록을 은폐하고 단순 병사로 처리를 했는데 경찰이 당시 의사 2명에 대해서 구속영장을 신청했습니다.';
let scriptTest59_3 = new Script();
scriptTest59_3.startTime = new Time(15, 44);
scriptTest59_3.endTime = new Time(22, 80);
scriptTest59_3.text = '병원 측은 공식 사과를 하면서도 아기를 떨어뜨린 게 직접적인 사망 원인은 아니라고 주장했습니다.​';
let scriptTest59_4 = new Script();
scriptTest59_4.startTime = new Time(22, 80);
scriptTest59_4.endTime = new Time(24, 85);
scriptTest59_4.text = '이기주 기잡니다.';

// 60번 뉴스
let tagTest60_1 = new Tag();
tagTest60_1.name = '미국';
let tagTest60_2 = new Tag();
tagTest60_2.name = '낙태권';
let tagTest60_3 = new Tag();
tagTest60_3.name = '시위';

let scriptTest60_1 = new Script();
scriptTest60_1.startTime = new Time(0, 0);
scriptTest60_1.endTime = new Time(4, 86);
scriptTest60_1.text = '미국 대법원이 낙태를 허용해 왔던 50년 전 판결을 폐기했습니다.';
let scriptTest60_2 = new Script();
scriptTest60_2.startTime = new Time(4, 86);
scriptTest60_2.endTime = new Time(10, 93);
scriptTest60_2.text = '앞으로는 각 주별로 낙태를 허용할지 말지 판단이 달라지는데요.';
let scriptTest60_3 = new Script();
scriptTest60_3.startTime = new Time(10, 93);
scriptTest60_3.endTime = new Time(17, 57);
scriptTest60_3.text = '진보와 보수 진영이 첨예하게 대립하는 사안인 만큼 오늘 미 전역에서는 대규모 시위가 열렸습니다.​';
let scriptTest60_4 = new Script();
scriptTest60_4.startTime = new Time(17, 57);
scriptTest60_4.endTime = new Time(20, 42);
scriptTest60_4.text = '뉴욕에서 김종원 특파원입니다.';

// 61번 뉴스
let tagTest61_1 = new Tag();
tagTest61_1.name = '미국';
let tagTest61_2 = new Tag();
tagTest61_2.name = '물가';
let tagTest61_3 = new Tag();
tagTest61_3.name = '코로나';

let scriptTest61_1 = new Script();
scriptTest61_1.startTime = new Time(0, 0);
scriptTest61_1.endTime = new Time(1, 36);
scriptTest61_1.text = '다음 소식입니다.';
let scriptTest61_2 = new Script();
scriptTest61_2.startTime = new Time(1, 36);
scriptTest61_2.endTime = new Time(7, 91);
scriptTest61_2.text = '일상을 회복해 가고 있는 미국은 최근 물가가 13년 만에 최고치를 기록했습니다.';
let scriptTest61_3 = new Script();
scriptTest61_3.startTime = new Time(7, 91);
scriptTest61_3.endTime = new Time(18, 46);
scriptTest61_3.text = '코로나 극복을 위해 시중에 천문학적인 돈을 풀어온 미국 정부가 이제는 돈줄을 조일 준비를 하고 있는데 우리 경제에도 영향을 미칠 것으로 보입니다.​';
let scriptTest61_4 = new Script();
scriptTest61_4.startTime = new Time(18, 46);
scriptTest61_4.endTime = new Time(21, 32);
scriptTest61_4.text = '뉴욕에서 김종원 특파원입니다.';

// 62번 뉴스
let tagTest62_1 = new Tag();
tagTest62_1.name = 'BTS';
let tagTest62_2 = new Tag();
tagTest62_2.name = '아미';
let tagTest62_3 = new Tag();
tagTest62_3.name = '새로운문화';

let scriptTest62_1 = new Script();
scriptTest62_1.startTime = new Time(0, 0);
scriptTest62_1.endTime = new Time(3, 79);
scriptTest62_1.text = '그룹 방탄소년단과 팬클럽 아미.';
let scriptTest62_2 = new Script();
scriptTest62_2.startTime = new Time(3, 79);
scriptTest62_2.endTime = new Time(9, 67);
scriptTest62_2.text = '새로운 문화 생태계를 만들어온 이들을 연구하는 전 세계 학자들이 한국에 모였습니다.';
let scriptTest62_3 = new Script();
scriptTest62_3.startTime = new Time(9, 67);
scriptTest62_3.endTime = new Time(19, 3);
scriptTest62_3.text = '방탄소년단의 성공 못지않게 세계 각지에서 더 나은 세상을 위해서 분투하는 아미들의 활약에 많은 관심이 쏠리고 있습니다.​';
let scriptTest62_4 = new Script();
scriptTest62_4.startTime = new Time(19, 3);
scriptTest62_4.endTime = new Time(22, 8);
scriptTest62_4.text = '김석 기자가 취재했습니다.';

// 63번 뉴스
let tagTest63_1 = new Tag();
tagTest63_1.name = '코로나19';
let tagTest63_2 = new Tag();
tagTest63_2.name = '4차접종';
let tagTest63_3 = new Tag();
tagTest63_3.name = '거리두기';

let scriptTest63_1 = new Script();
scriptTest63_1.startTime = new Time(0, 0);
scriptTest63_1.endTime = new Time(6, 71);
scriptTest63_1.text = '코로나 유행이 확산세로 돌아선 가운데 신규 확진자는 두 달여 만에 4만 명대로 급증했습니다.';
let scriptTest63_2 = new Script();
scriptTest63_2.startTime = new Time(6, 71);
scriptTest63_2.endTime = new Time(16, 17);
scriptTest63_2.text = '재유행이 시작됐다고 판단한 정부는 4차 접종 대상에 50대를 포함하는 것을 주요 내용으로 하는 대응 방안을 발표했는데요.';
let scriptTest63_3 = new Script();
scriptTest63_3.startTime = new Time(16, 17);
scriptTest63_3.endTime = new Time(19, 28);
scriptTest63_3.text = '이번에 거리두기 조치는 없었습니다.';
let scriptTest63_4 = new Script();
scriptTest63_4.startTime = new Time(19, 30);
scriptTest63_4.endTime = new Time(22, 29);
scriptTest63_4.text = '원동희 기자가 보도합니다.';

// 64번 뉴스
let tagTest64_1 = new Tag();
tagTest64_1.name = '포괄임금제';
let tagTest64_2 = new Tag();
tagTest64_2.name = '연장수당';
let tagTest64_3 = new Tag();
tagTest64_3.name = '야근수당';

let scriptTest64_1 = new Script();
scriptTest64_1.startTime = new Time(0, 0);
scriptTest64_1.endTime = new Time(7, 18);
scriptTest64_1.text = '많이 달라졌다고는 하지만 한국은 여전히 OECD 국가들 가운데 가장 과로하는 나라입니다.';
let scriptTest64_2 = new Script();
scriptTest64_2.startTime = new Time(7, 18);
scriptTest64_2.endTime = new Time(11, 67);
scriptTest64_2.text = '멕시코, 코스타리카에 이어서 노동시간이 세 번째로 긴데요.';
let scriptTest64_3 = new Script();
scriptTest64_3.startTime = new Time(11, 67);
scriptTest64_3.endTime = new Time(15, 14);
scriptTest64_3.text = '이 장시간 노동의 주범으로 지목되는 제도가 있습니다​.';
let scriptTest64_4 = new Script();
scriptTest64_4.startTime = new Time(15, 14);
scriptTest64_4.endTime = new Time(17, 33);
scriptTest64_4.text = '바로 포괄임금제.';
let scriptTest64_5 = new Script();
scriptTest64_5.startTime = new Time(17, 33);
scriptTest64_5.endTime = new Time(21, 76);
scriptTest64_5.text = '실제로 얼마를 일 하든 미리 정해놓은 수당만 지급하는 제도죠.';
let scriptTest64_6 = new Script();
scriptTest64_6.startTime = new Time(21, 76);
scriptTest64_6.endTime = new Time(27, 78);
scriptTest64_6.text = '우리나라 대기업 10곳 중의 6곳이 사무직들에게 포괄임금제를 적용하고 있습니다.';
let scriptTest64_7 = new Script();
scriptTest64_7.startTime = new Time(27, 78);
scriptTest64_7.endTime = new Time(29, 83);
scriptTest64_7.text = '이대로 놔둬도 되는 걸까.​';
let scriptTest64_8 = new Script();
scriptTest64_8.startTime = new Time(29, 83);
scriptTest64_8.endTime = new Time(34, 67);
scriptTest64_8.text = '뉴스데스크는 오늘과 내일 이 문제를 집중적으로 다뤄보겠습니다.';
let scriptTest64_9 = new Script();
scriptTest64_9.startTime = new Time(34, 67);
scriptTest64_9.endTime = new Time(37, 47);
scriptTest64_9.text = '차주혁 기자가 전해드리겠습니다.';

// 65번 뉴스
let tagTest65_1 = new Tag();
tagTest65_1.name = '물가';
let tagTest65_2 = new Tag();
tagTest65_2.name = '식자재';
let tagTest65_3 = new Tag();
tagTest65_3.name = '자영업자';

let scriptTest65_1 = new Script();
scriptTest65_1.startTime = new Time(0, 0);
scriptTest65_1.endTime = new Time(7, 37);
scriptTest65_1.text = '요즘 물가 상승으로 식자재 가격이 크게 오르면서 식당을 운영하는 자영업자들의 고민도 깊어지고 있습니다.';
let scriptTest65_2 = new Script();
scriptTest65_2.startTime = new Time(7, 37);
scriptTest65_2.endTime = new Time(14, 94);
scriptTest65_2.text = '음식 가격을 올리자니 손님이 줄어들 것 같고 그렇다고 가격을 그대로 두면 원가를 맞출 수가 없기 때문인데요.';
let scriptTest65_3 = new Script();
scriptTest65_3.startTime = new Time(14, 94);
scriptTest65_3.endTime = new Time(19, 86);
scriptTest65_3.text = '그래서 반찬의 가짓수나 양을 줄이는 등 고육지책을 마련하고 있습니다.​';
let scriptTest65_4 = new Script();
scriptTest65_4.startTime = new Time(19, 86);
scriptTest65_4.endTime = new Time(22, 58);
scriptTest65_4.text = '오상현 기자가 현장에 다녀왔습니다.';

// 66번 뉴스
let tagTest66_1 = new Tag();
tagTest66_1.name = '베이징올림픽';
let tagTest66_2 = new Tag();
tagTest66_2.name = '홈어드밴티지';
let tagTest66_3 = new Tag();
tagTest66_3.name = '중국';

let scriptTest66_1 = new Script();
scriptTest66_1.startTime = new Time(0, 0);
scriptTest66_1.endTime = new Time(8, 9);
scriptTest66_1.text = '올림픽에서 개최국 선수들은 경기장 적응하는 데 아무래도 더 유리하고, 또 홈팬들의 뜨거운 응원도 받을 수 있습니다.';
let scriptTest66_2 = new Script();
scriptTest66_2.startTime = new Time(8, 9);
scriptTest66_2.endTime = new Time(13, 71);
scriptTest66_2.text = '그런데 이번 대회는 그것 말고도 개최국의 이점이 더 있는 것 같습니다.';
let scriptTest66_3 = new Script();
scriptTest66_3.startTime = new Time(13, 71);
scriptTest66_3.endTime = new Time(23, 12);
scriptTest66_3.text = '앞서 보신 대로 쇼트트랙에서 우리를 비롯해 다른 나라들에게는 심판이 엄격한 잣대를 적용하고 있지만 중국 선수들에게는 그렇지 않았습니다.​';
let scriptTest66_4 = new Script();
scriptTest66_4.startTime = new Time(23, 12);
scriptTest66_4.endTime = new Time(26, 8);
scriptTest66_4.text = '이 내용은 김형열 기자가 정리했습니다.';

// 67번 뉴스
let tagTest67_1 = new Tag();
tagTest67_1.name = '트럼프';
let tagTest67_2 = new Tag();
tagTest67_2.name = '시위';
let tagTest67_3 = new Tag();
tagTest67_3.name = '노마스크';

let scriptTest67_1 = new Script();
scriptTest67_1.startTime = new Time(0, 0);
scriptTest67_1.endTime = new Time(5, 25);
scriptTest67_1.text = '미국에서는 또 하루 사이 확진자가 무려 십칠만 명 넘게 나왔는데요.';
let scriptTest67_2 = new Script();
scriptTest67_2.startTime = new Time(5, 25);
scriptTest67_2.endTime = new Time(12, 33);
scriptTest67_2.text = '이런 상황에서 트럼프 지지자들이 수도 워싱턴 DC에 모여 대규모 대선 불복 집회를 열었습니다.';
let scriptTest67_3 = new Script();
scriptTest67_3.startTime = new Time(12, 33);
scriptTest67_3.endTime = new Time(17, 57);
scriptTest67_3.text = '​그런데 마스크 쓰지 않은 사람이 너무 많아서 마스크 찾아보기가 어려울 정도였다고 합니다.';
let scriptTest67_4 = new Script();
scriptTest67_4.startTime = new Time(17, 57);
scriptTest67_4.endTime = new Time(20, 32);
scriptTest67_4.text = '워싱턴에서 임종주 특파원이 보도합니다.';

// 68번 뉴스
let tagTest68_1 = new Tag();
tagTest68_1.name = '일본';
let tagTest68_2 = new Tag();
tagTest68_2.name = '한일관계';
let tagTest68_3 = new Tag();
tagTest68_3.name = '한류';

let scriptTest68_1 = new Script();
scriptTest68_1.startTime = new Time(0, 0);
scriptTest68_1.endTime = new Time(5, 73);
scriptTest68_1.text = '워싱턴에서 임종주 특파원이 보도합니다.';
let scriptTest68_2 = new Script();
scriptTest68_2.startTime = new Time(5, 73);
scriptTest68_2.endTime = new Time(16, 39);
scriptTest68_2.text = '우리나라 동네 슈퍼마켓을 그대로 옮긴 듯한 가게가 도쿄 도심도 아닌 지방의 한 주택가에 생길 정도인데요, 소문을 듣고 찾아가기까지 한다고 합니다.';
let scriptTest68_3 = new Script();
scriptTest68_3.startTime = new Time(16, 39);
scriptTest68_3.endTime = new Time(19, 24);
scriptTest68_3.text = '도쿄에서 유성재 특파원입니다.';

// 69번 뉴스
let tagTest69_1 = new Tag();
tagTest69_1.name = '미국대선';
let tagTest69_2 = new Tag();
tagTest69_2.name = '바이든';
let tagTest69_3 = new Tag();
tagTest69_3.name = '트럼프';

let scriptTest69_1 = new Script();
scriptTest69_1.startTime = new Time(0, 0);
scriptTest69_1.endTime = new Time(1, 75);
scriptTest69_1.text = '여러분, 안녕하십니까?';
let scriptTest69_2 = new Script();
scriptTest69_2.startTime = new Time(1, 75);
scriptTest69_2.endTime = new Time(11, 6);
scriptTest69_2.text = '미국 대통령 선거, 아직도 개표가 끝나지 않은 가운데 민주당 바이든 후보가 백악관을 향해서 한 발짝 더 다가섰습니다.';
let scriptTest69_3 = new Script();
scriptTest69_3.startTime = new Time(11, 6);
scriptTest69_3.endTime = new Time(18, 1);
scriptTest69_3.text = '트럼프 대통령에게 뒤지고 있던 경합 지역에서 역전하거나 또 격차를 계속 좁혀가고 있습니다.​';
let scriptTest69_4 = new Script();
scriptTest69_4.startTime = new Time(18, 1);
scriptTest69_4.endTime = new Time(29, 43);
scriptTest69_4.text = '지금 가장 치열한 지역이 펜실베이니아와 조지아 두 곳인데 약 1시간 반 전에 이 조지아에서 바이든 후보가 트럼프를 앞서가기 시작했습니다.';
let scriptTest69_5 = new Script();
scriptTest69_5.startTime = new Time(29, 43);
scriptTest69_5.endTime = new Time(36, 45);
scriptTest69_5.text = '트럼프 대통령은 개표 과정에 문제가 있다며 소송을 냈었는데 그게 법원에서 잇따라 기각됐습니다.';
let scriptTest69_6 = new Script();
scriptTest69_6.startTime = new Time(36, 45);
scriptTest69_6.endTime = new Time(39, 13);
scriptTest69_6.text = '오늘 첫 소식 먼저 정준영 기자입니다.';

// 70번 뉴스
let tagTest70_1 = new Tag();
tagTest70_1.name = '일본';
let tagTest70_2 = new Tag();
tagTest70_2.name = '신사참배';
let tagTest70_3 = new Tag();
tagTest70_3.name = '전쟁';

let scriptTest70_1 = new Script();
scriptTest70_1.startTime = new Time(0, 0);
scriptTest70_1.endTime = new Time(7, 94);
scriptTest70_1.text = '일본 국회의원들이 태평양전쟁 A급 전범이 합사된 야스쿠니 신사를 2년 2개월 만에 집단 참배했습니다.';
let scriptTest70_2 = new Script();
scriptTest70_2.startTime = new Time(7, 94);
scriptTest70_2.endTime = new Time(20, 23);
scriptTest70_2.text = '교도통신과 산케이 신문에 따르면 일본의 초당파 의원 모임인 \'다함께 야스쿠니 신사를 참배하는 국회의원 모임\' 소속 의원 99명이 오늘 오전 도쿄 소재 야스쿠니 신사를 방문해 참배했습니다.';
let scriptTest70_3 = new Script();
scriptTest70_3.startTime = new Time(20, 23);
scriptTest70_3.endTime = new Time(26, 73);
scriptTest70_3.text = '이 모임의 야스쿠니 신사 참배는 2019년 10월 18일 이후 약 2년 2개월 만입니다.';
let scriptTest70_4 = new Script();
scriptTest70_4.startTime = new Time(26, 73);
scriptTest70_4.endTime = new Time(34, 99);
scriptTest70_4.text = '정부 측 인사로는 호소다 겐이치로 경제산업성 부대신과 무타이 슌스케 환경성 부대신 등이 포함됐습니다.';

// 71번 뉴스
let tagTest71_1 = new Tag();
tagTest71_1.name = '의료사고';
let tagTest71_2 = new Tag();
tagTest71_2.name = '사망사고';
let tagTest71_3 = new Tag();
tagTest71_3.name = '국민청원';

let scriptTest71_1 = new Script();
scriptTest71_1.startTime = new Time(0, 0);
scriptTest71_1.endTime = new Time(7, 42);
scriptTest71_1.text = '저희 KBS는 지난해 편도 제거 수술을 받고 숨진 5살 김동이 군 사건을 심층 보도한 바 있는데요.';
let scriptTest71_2 = new Script();
scriptTest71_2.startTime = new Time(7, 42);
scriptTest71_2.endTime = new Time(12, 58);
scriptTest71_2.text = '다시 수술을 집도 했던 의사는 업무상 과실치사 혐의로 경찰 조사를 받고 있습니다.';
let scriptTest71_3 = new Script();
scriptTest71_3.startTime = new Time(12, 58);
scriptTest71_3.endTime = new Time(19, 84);
scriptTest71_3.text = '그런데 한 30대 여성이 이 의사로부터 똑같은 수술을 받은 뒤 심각한 후유증을 앓게 된 사실이 또 드러났습니다.';
let scriptTest71_4 = new Script();
scriptTest71_4.startTime = new Time(19, 84);
scriptTest71_4.endTime = new Time(22, 23);
scriptTest71_4.text = '이영광 기자의 보도입니다.';

// 72번 뉴스
let tagTest72_1 = new Tag();
tagTest72_1.name = '수술실CCTV';
let tagTest72_2 = new Tag();
tagTest72_2.name = '의료사고';
let tagTest72_3 = new Tag();
tagTest72_3.name = '의료법';

let scriptTest72_1 = new Script();
scriptTest72_1.startTime = new Time(0, 0);
scriptTest72_1.endTime = new Time(2, 4);
scriptTest72_1.text = '다음 소식 전해드리겠습니다.';
let scriptTest72_2 = new Script();
scriptTest72_2.startTime = new Time(2, 4);
scriptTest72_2.endTime = new Time(13, 5);
scriptTest72_2.text = '12년 무사고라고 홍보를 해왔던 서울 강남의 한 유명 성형외과에서 안면 윤곽 수술을 받던 20대 대학생이 숨진 사고를 전해드린 바 있는데요.';
let scriptTest72_3 = new Script();
scriptTest72_3.startTime = new Time(13, 5);
scriptTest72_3.endTime = new Time(24, 34);
scriptTest72_3.text = '사건이 발생한 지 1년이 지난 최근에서야 유족들이 당시 수술실 안에서 무슨 일이 있었는지 담겨 있는 3시간 분량의 CCTV 영상을 확보할 수 있었습니다.​';
let scriptTest72_4 = new Script();
scriptTest72_4.startTime = new Time(24, 34);
scriptTest72_4.endTime = new Time(29, 4);
scriptTest72_4.text = '영상을 보니까 한 수술실 안에 수술대가 두 개가 있었고요.';
let scriptTest72_5 = new Script();
scriptTest72_5.startTime = new Time(29, 4);
scriptTest72_5.endTime = new Time(34, 38);
scriptTest72_5.text = '마취과 의사 한 명이 환자 두 명을 동시에 담당해서 수술이 이루어지고 있었습니다.';
let scriptTest72_6 = new Script();
scriptTest72_6.startTime = new Time(34, 38);
scriptTest72_6.endTime = new Time(38, 26);
scriptTest72_6.text = '먼저 신재웅 기자의 단독보도 보시겠습니다.';

// 73번 뉴스
let tagTest73_1 = new Tag();
tagTest73_1.name = '백내장';
let tagTest73_2 = new Tag();
tagTest73_2.name = '부작용';
let tagTest73_3 = new Tag();
tagTest73_3.name = '브로커';

let scriptTest73_1 = new Script();
scriptTest73_1.startTime = new Time(0, 0);
scriptTest73_1.endTime = new Time(10, 56);
scriptTest73_1.text = '일부 병원들이 브로커를 통해서 백내장 환자를 소개 받고 또 꼭 하지 않아도 될 수술을 해서 피해가 끊이질 않고 있습니다.';
let scriptTest73_2 = new Script();
scriptTest73_2.startTime = new Time(10, 56);
scriptTest73_2.endTime = new Time(17, 83);
scriptTest73_2.text = '수술 받은 이후에 부작용을 겪는 사람이 적지 않고 보상 받는 것도 쉽지 않아서 주의가 필요합니다.';
let scriptTest73_3 = new Script();
scriptTest73_3.startTime = new Time(17, 83);
scriptTest73_3.endTime = new Time(20, 18);
scriptTest73_3.text = '한성희 기자가 취재했습니다.';

// 74번 뉴스
let tagTest74_1 = new Tag();
tagTest74_1.name = '2030';
let tagTest74_2 = new Tag();
tagTest74_2.name = '주식';
let tagTest74_3 = new Tag();
tagTest74_3.name = '영끌';

let scriptTest74_1 = new Script();
scriptTest74_1.startTime = new Time(0, 0);
scriptTest74_1.endTime = new Time(1, 43);
scriptTest74_1.text = '네, 다음 소식입니다.';
let scriptTest74_2 = new Script();
scriptTest74_2.startTime = new Time(1, 43);
scriptTest74_2.endTime = new Time(5, 44);
scriptTest74_2.text = '고물가, 고환율, 그리고 고금리의 3고의 시대.';
let scriptTest74_3 = new Script();
scriptTest74_3.startTime = new Time(5, 44);
scriptTest74_3.endTime = new Time(12, 37);
scriptTest74_3.text = '대출 이자는 끊임없이 오르는데 주식이나 코인 시세는 반대로 곤두박질치면서 투자가 쉽지 않은 시기인데요.​';
let scriptTest74_4 = new Script();
scriptTest74_4.startTime = new Time(12, 37);
scriptTest74_4.endTime = new Time(19, 71);
scriptTest74_4.text = '그동안 주식이나 가상화폐 투자를 당연시해왔던 2030세대의 경제 사정은 특히 심상치 않습니다.';
let scriptTest74_5 = new Script();
scriptTest74_5.startTime = new Time(19, 71);
scriptTest74_5.endTime = new Time(28, 47);
scriptTest74_5.text = '영혼까지 끌어모아 대출받고 빚내서 투자했다가 큰 손실을 보는 사례도 속출하고 있어서 사회적 파장이 만만치 않을 것으로 우려됩니다.';
let scriptTest74_6 = new Script();
scriptTest74_6.startTime = new Time(28, 47);
scriptTest74_6.endTime = new Time(30, 43);
scriptTest74_6.text = '강민경 기자입니다.';

// 75번 뉴스
let tagTest75_1 = new Tag();
tagTest75_1.name = '2030';
let tagTest75_2 = new Tag();
tagTest75_2.name = '코인';
let tagTest75_3 = new Tag();
tagTest75_3.name = '희망절벽세대';

let scriptTest75_1 = new Script();
scriptTest75_1.startTime = new Time(0, 0);
scriptTest75_1.endTime = new Time(7, 2);
scriptTest75_1.text = '국내 거래소에 상장된 코인 등 가상화폐 시가총액이 열흘 새 40% 넘게 빠졌습니다.';
let scriptTest75_2 = new Script();
scriptTest75_2.startTime = new Time(7, 2);
scriptTest75_2.endTime = new Time(14, 30);
scriptTest75_2.text = 'KB·하나·우리은행은 너무 위험하기 때문에, 가상화폐 거래소와는 계약하지 않는 쪽으로 가닥을 잡았습니다.';
let scriptTest75_3 = new Script();
scriptTest75_3.startTime = new Time(14, 30);
scriptTest75_3.endTime = new Time(19, 22);
scriptTest75_3.text = '그럼에도 "코인 같은 고위험 투자를 안 할 수 없다"는 2030이 많은데요.​';
let scriptTest75_4 = new Script();
scriptTest75_4.startTime = new Time(19, 22);
scriptTest75_4.endTime = new Time(25, 45);
scriptTest75_4.text = '저희가 만난 한 청년은 우리는 희망절벽 세대라 더 이런 투자에 매달리게 된다고 했습니다.';
let scriptTest75_5 = new Script();
scriptTest75_5.startTime = new Time(25, 45);
scriptTest75_5.endTime = new Time(27, 9);
scriptTest75_5.text = '정종문 기자입니다.';

// 76번 뉴스
let tagTest76_1 = new Tag();
tagTest76_1.name = '퀴어문화축제';
let tagTest76_2 = new Tag();
tagTest76_2.name = '서울시';
let tagTest76_3 = new Tag();
tagTest76_3.name = '차별';

let scriptTest76_1 = new Script();
scriptTest76_1.startTime = new Time(0, 0);
scriptTest76_1.endTime = new Time(6, 77);
scriptTest76_1.text = '성 소수자의 인권을 알리는 퀴어축제가 온라인을 벗어나 서울광장에서 대면으로 열립니다.';
let scriptTest76_2 = new Script();
scriptTest76_2.startTime = new Time(6, 77);
scriptTest76_2.endTime = new Time(8, 13);
scriptTest76_2.text = '3년 만입니다.';
let scriptTest76_3 = new Script();
scriptTest76_3.startTime = new Time(8, 13);
scriptTest76_3.endTime = new Time(10, 28);
scriptTest76_3.text = '하지만 과정이 순탄치 않습니다.​';
let scriptTest76_4 = new Script();
scriptTest76_4.startTime = new Time(10, 28);
scriptTest76_4.endTime = new Time(17, 5);
scriptTest76_4.text = '주최 측은 엿새 동안 열겠다고 신청을 했는데, 서울시는 단 하루만 허용을 했습니다.';
let scriptTest76_5 = new Script();
scriptTest76_5.startTime = new Time(17, 5);
scriptTest76_5.endTime = new Time(19, 37);
scriptTest76_5.text = '차별이라는 비판이 나오고 있습니다.';
let scriptTest76_6 = new Script();
scriptTest76_6.startTime = new Time(19, 37);
scriptTest76_6.endTime = new Time(20, 72);
scriptTest76_6.text = '박현주 기자입니다.';

// 77번 뉴스
let tagTest77_1 = new Tag();
tagTest77_1.name = 'BTS';
let tagTest77_2 = new Tag();
tagTest77_2.name = '그래미';
let tagTest77_3 = new Tag();
tagTest77_3.name = '병역';

let scriptTest77_1 = new Script();
scriptTest77_1.startTime = new Time(0, 0);
scriptTest77_1.endTime = new Time(8, 69);
scriptTest77_1.text = '그룹 방탄소년단, BTS의 미국 라스베이거스 공연이 이어지면서 오는 주말까지 팬 수십만 명이 몰려들 것으로 보입니다.';
let scriptTest77_2 = new Script();
scriptTest77_2.startTime = new Time(8, 69);
scriptTest77_2.endTime = new Time(13, 44);
scriptTest77_2.text = 'BTS와 소속사 하이브가 현지에서 모처럼 만에 기자회견을 열었는데요.';
let scriptTest77_3 = new Script();
scriptTest77_3.startTime = new Time(13, 44);
scriptTest77_3.endTime = new Time(17, 62);
scriptTest77_3.text = '그래미 시상식과 병역 문제와 관련한 입장을 언급했습니다.​';
let scriptTest77_4 = new Script();
scriptTest77_4.startTime = new Time(17, 62);
scriptTest77_4.endTime = new Time(20, 0);
scriptTest77_4.text = '박기완 기자입니다.';

// 78번 뉴스
let tagTest78_1 = new Tag();
tagTest78_1.name = '기생충';
let tagTest78_2 = new Tag();
tagTest78_2.name = '아카데미';
let tagTest78_3 = new Tag();
tagTest78_3.name = '송강호';

let scriptTest78_1 = new Script();
scriptTest78_1.startTime = new Time(0, 0);
scriptTest78_1.endTime = new Time(3, 28);
scriptTest78_1.text = '정말 반가운 얼굴들입니다.';
let scriptTest78_2 = new Script();
scriptTest78_2.startTime = new Time(3, 28);
scriptTest78_2.endTime = new Time(10, 38);
scriptTest78_2.text = '92년 역사의 아카데미를 흔들었던 영화 \'기생충\'의 사람들이 오늘 돌아왔습니다.';
let scriptTest78_3 = new Script();
scriptTest78_3.startTime = new Time(10, 38);
scriptTest78_3.endTime = new Time(17, 37);
scriptTest78_3.text = '오늘부터 일상으로 복귀하지만 우리에게 가슴 벅찬 순간을 선물했던 아카데미의 시간은 여전히 진행 중입니다.​';
let scriptTest78_4 = new Script();
scriptTest78_4.startTime = new Time(17, 37);
scriptTest78_4.endTime = new Time(23, 15);
scriptTest78_4.text = '봉준호 감독과 기생충을 향한 신드롬은 신조어로, 그리고 패러디로 표출되고 있습니다.';
let scriptTest78_5 = new Script();
scriptTest78_5.startTime = new Time(23, 15);
scriptTest78_5.endTime = new Time(27, 29);
scriptTest78_5.text = '먼저 문상혁 기자가 오늘 새벽 귀국현장을 다녀왔습니다.';

// 79번 뉴스
let tagTest79_1 = new Tag();
tagTest79_1.name = '미국';
let tagTest79_2 = new Tag();
tagTest79_2.name = '경기침체';
let tagTest79_3 = new Tag();
tagTest79_3.name = '경제전망';

let scriptTest79_1 = new Script();
scriptTest79_1.startTime = new Time(0, 0);
scriptTest79_1.endTime = new Time(9, 72);
scriptTest79_1.text = '전 세계적으로 경기침체 우려가 제기되고 있지만, 미국의 성장이 강력하고 경기침체에 빠질 어떤 이유도 없다고 미국 고위 관리가 밝혔습니다.';
let scriptTest79_2 = new Script();
scriptTest79_2.startTime = new Time(9, 72);
scriptTest79_2.endTime = new Time(17, 38);
scriptTest79_2.text = '지나 러몬도 미 상무장관은 현지 시각 10일 ABC 방송에 출연해, 자신은 경기침체를 피할 수 있다고 본다면서,';
let scriptTest79_3 = new Script();
scriptTest79_3.startTime = new Time(17, 38);
scriptTest79_3.endTime = new Time(27, 33);
scriptTest79_3.text = '지난 1년 반 동안 미국 경제는 5∼6%라는 전례 없이 높은 수준으로 성장해왔다고 말했습니다.​';

// 80번 뉴스
let tagTest80_1 = new Tag();
tagTest80_1.name = '민주당';
let tagTest80_2 = new Tag();
tagTest80_2.name = '철야농성';
let tagTest80_3 = new Tag();
tagTest80_3.name = '예산결산위원회';

let scriptTest80_1 = new Script();
scriptTest80_1.startTime = new Time(0, 0);
scriptTest80_1.endTime = new Time(7, 66);
scriptTest80_1.text = '더불어민주당이 17조 원 규모의 추가경정예산안 처리를 촉구하며 철야농성에 들어갔습니다.';
let scriptTest80_2 = new Script();
scriptTest80_2.startTime = new Time(7, 66);
scriptTest80_2.endTime = new Time(15, 51);
scriptTest80_2.text = '앞서 민주당이 단독 처리하겠다며 야당을 압박하면서 국회 예산결산위원회 전체 회의가 열리기도 했습니다.';
let scriptTest80_3 = new Script();
scriptTest80_3.startTime = new Time(15, 51);
scriptTest80_3.endTime = new Time(25, 42);
scriptTest80_3.text = '하지만, 국민의힘은 "방역지원금 규모 등에 이견이 크다"며 반발했고, 결국 국민의힘 소속 이종배 예결위원장이 회의를 중단시켰습니다.​';
let scriptTest80_4 = new Script();
scriptTest80_4.startTime = new Time(25, 42);
scriptTest80_4.endTime = new Time(32, 22);
scriptTest80_4.text = '민주당은 전체 회의를 다시 열 것을 요구하며 예결위 회의장에서 농성을 벌이고 있습니다.';

// 81번 뉴스
let tagTest81_1 = new Tag();
tagTest81_1.name = '윤석열';
let tagTest81_2 = new Tag();
tagTest81_2.name = '김종인';
let tagTest81_3 = new Tag();
tagTest81_3.name = '광주';

let scriptTest81_1 = new Script();
scriptTest81_1.startTime = new Time(0, 0);
scriptTest81_1.endTime = new Time(8, 19);
scriptTest81_1.text = '이번 논란의 시작은 윤석열 전 총장이 "전두환 씨가 5·18과 쿠데타 빼면 정치 잘했다" 이렇게 말한 거였죠.';
let scriptTest81_2 = new Script();
scriptTest81_2.startTime = new Time(8, 19);
scriptTest81_2.endTime = new Time(15, 24);
scriptTest81_2.text = '논란이 가라앉지 않자 윤 전 총장은 어젯밤 광주의 마음을 사기 위해 노력했던 김종인 전 위원장을 찾아갔습니다.';
let scriptTest81_3 = new Script();
scriptTest81_3.startTime = new Time(15, 24);
scriptTest81_3.endTime = new Time(19, 91);
scriptTest81_3.text = '그리고 오늘은 다음 달 초, 광주에 직접 가서 사과하겠다고 했습니다.​';
let scriptTest81_4 = new Script();
scriptTest81_4.startTime = new Time(19, 91);
scriptTest81_4.endTime = new Time(21, 88);
scriptTest81_4.text = '계속해서 임지수 기자입니다.';

// 82번 뉴스
let tagTest82_1 = new Tag();
tagTest82_1.name = '세금';
let tagTest82_2 = new Tag();
tagTest82_2.name = '정부';
let tagTest82_3 = new Tag();
tagTest82_3.name = '종합부동산세';

let scriptTest82_1 = new Script();
scriptTest82_1.startTime = new Time(0, 0);
scriptTest82_1.endTime = new Time(14, 46);
scriptTest82_1.text = '화제의 경제 뉴스를 빠르게 전해드리는 신선한 경제 시간입니다.';
let scriptTest82_2 = new Script();
scriptTest82_2.startTime = new Time(14, 46);
scriptTest82_2.endTime = new Time(23, 8);
scriptTest82_2.text = '정부가 주택 수에 따라 세금을 물리는 현행 종합부동산세 제도를 주택 수가 아닌 주택 가격 기준으로 바꾸기로 했습니다.';
let scriptTest82_3 = new Script();
scriptTest82_3.startTime = new Time(23, 8);
scriptTest82_3.endTime = new Time(30, 15);
scriptTest82_3.text = '지난 정부는 징벌적 과세 차원에서 다주택자들이 종합부동산세를 많이 내도록 세율을 고쳤는데요.​';
let scriptTest82_4 = new Script();
scriptTest82_4.startTime = new Time(30, 15);
scriptTest82_4.endTime = new Time(36, 73);
scriptTest82_4.text = '현행 종부세율은 1주택자의 경우 최고 3%지만 다주택자는 6%까지 늘어납니다.';
let scriptTest82_5 = new Script();
scriptTest82_5.startTime = new Time(36, 73);
scriptTest82_5.endTime = new Time(45, 96);
scriptTest82_5.text = '하지만 초고가 아파트 한 채를 가진 사람보다 저가 아파트 두 채를 보유한 사람이 세율이 더 높아 과세 형평성에 어긋난다는 지적을 받아왔는데요.​';
let scriptTest82_6 = new Script();
scriptTest82_6.startTime = new Time(45, 96);
scriptTest82_6.endTime = new Time(53, 5);
scriptTest82_6.text = '정부는 오는 21일 이 같은 종부세 개편 방안을 담은 세법 개정안을 발표할 예정입니다.';

// 83번 뉴스
let tagTest83_1 = new Tag();
tagTest83_1.name = '손흥민';
let tagTest83_2 = new Tag();
tagTest83_2.name = '득점왕';
let tagTest83_3 = new Tag();
tagTest83_3.name = '토트넘';

let scriptTest83_1 = new Script();
scriptTest83_1.startTime = new Time(0, 0);
scriptTest83_1.endTime = new Time(8, 55);
scriptTest83_1.text = '토트넘의 손흥민 선수가 아시아 선수 최초로 세계 최고의 프로축구 리그인 잉글랜드 프리미어리그 득점왕에 오르는 새 역사를 썼습니다.';
let scriptTest83_2 = new Script();
scriptTest83_2.startTime = new Time(8, 55);
scriptTest83_2.endTime = new Time(20, 76);
scriptTest83_2.text = '손흥민은 노리치 시티와 마지막 원정경기에서 후반에 22호와 23호 골을 잇달아 터트려 마지막 경기에서 한 골을 추가한 리버풀의 모하메드 살라와 공동 득점왕에 올랐습니다.';
let scriptTest83_3 = new Script();
scriptTest83_3.startTime = new Time(20, 76);
scriptTest83_3.endTime = new Time(30, 44);
scriptTest83_3.text = '토트넘은 손흥민과 클루셉스키의 멀티 골로 노리치를 5대 0으로 대파하고 4위를 확정해 다음 시즌 챔피언스리그 진출 티켓도 손에 넣었습니다.​';
let scriptTest83_4 = new Script();
scriptTest83_4.startTime = new Time(30, 44);
scriptTest83_4.endTime = new Time(37, 60);
scriptTest83_4.text = '손흥민은 올 시즌 기록한 스물세 골을 모두 필드골로 채워 득점 순도도 굉장히 높다는 평가를 받습니다.';
let scriptTest83_5 = new Script();
scriptTest83_5.startTime = new Time(37, 60);
scriptTest83_5.endTime = new Time(51, 54);
scriptTest83_5.text = '페널티킥을 제외한 필드골로만 스물세 골을 넣은 손흥민 선수가 아시아 선수 최초로 세계 최고의 프로축구 리그, 잉글랜드 프리미어리그에서 살라와 함께 공동 득점왕에 올랐다는 소식 전해드리겠습니다.​';

// 84번 뉴스
let tagTest84_1 = new Tag();
tagTest84_1.name = '경기침체';
let tagTest84_2 = new Tag();
tagTest84_2.name = 'OECD';
let tagTest84_3 = new Tag();
tagTest84_3.name = '성장률';

let scriptTest84_1 = new Script();
scriptTest84_1.startTime = new Time(0, 0);
scriptTest84_1.endTime = new Time(9, 11);
scriptTest84_1.text = '경제협력개발기구 OECD는 올해 한국의 성장률 전망치를 3%에서 2.7%로 내려 잡았습니다.';
let scriptTest84_2 = new Script();
scriptTest84_2.startTime = new Time(9, 11);
scriptTest84_2.endTime = new Time(14, 76);
scriptTest84_2.text = '내년 전망치는 2.5%로 더 낮춰 잡았습니다. 이뿐만이 아닙니다.';
let scriptTest84_3 = new Script();
scriptTest84_3.startTime = new Time(14, 76);
scriptTest84_3.endTime = new Time(19, 66);
scriptTest84_3.text = '주요 수출 시장인 중국과 미국의 성장률 전망치도 떨어졌는데,​';
let scriptTest84_4 = new Script();
scriptTest84_4.startTime = new Time(19, 66);
scriptTest84_4.endTime = new Time(25, 89);
scriptTest84_4.text = '우리 경제 상황 점점 어두워져 가는 분위기입니다. 계속해서 박혜진 기자입니다.';

// 85번 뉴스
let tagTest85_1 = new Tag();
tagTest85_1.name = '스포츠';
let tagTest85_2 = new Tag();
tagTest85_2.name = '육상';
let tagTest85_3 = new Tag();
tagTest85_3.name = '한국신기록';

let scriptTest85_1 = new Script();
scriptTest85_1.startTime = new Time(0, 0);
scriptTest85_1.endTime = new Time(8, 80);
scriptTest85_1.text = '지난달 전국소년체전에 출전한 대구의 한 중학생이 육상 100미터에서 중학생 부문 한국 신기록을 세웠습니다.';
let scriptTest85_2 = new Script();
scriptTest85_2.startTime = new Time(8, 80);
scriptTest85_2.endTime = new Time(21, 66);
scriptTest85_2.text = '대한민국의 중학생 가운데 가장 빠른 이 학생은 신체 조건이나 주법이 또래 선수들에 비해 월등해 장차 한국 육상 단거리를 빛낼 유망주로 큰 기대를 모으고 있습니다.';
let scriptTest85_3 = new Script();
scriptTest85_3.startTime = new Time(21, 66);
scriptTest85_3.endTime = new Time(24, 23);
scriptTest85_3.text = '권기준 기자가 취재했습니다.​';

// 86번 뉴스
let tagTest86_1 = new Tag();
tagTest86_1.name = '환율';
let tagTest86_2 = new Tag();
tagTest86_2.name = '유학';
let tagTest86_3 = new Tag();
tagTest86_3.name = '달러';

let scriptTest86_1 = new Script();
scriptTest86_1.startTime = new Time(0, 0);
scriptTest86_1.endTime = new Time(6, 38);
scriptTest86_1.text = '원·달러 환율도 13년 만에 최고 수준을 기록하면서, 환율에 가장 민감한 사람들이죠.';
let scriptTest86_2 = new Script();
scriptTest86_2.startTime = new Time(6, 38);
scriptTest86_2.endTime = new Time(9, 31);
scriptTest86_2.text = '해외 유학생들의 부담이 커지고 있습니다.';
let scriptTest86_3 = new Script();
scriptTest86_3.startTime = new Time(9, 31);
scriptTest86_3.endTime = new Time(18, 31);
scriptTest86_3.text = '보내는 돈은 같지만 받는 돈은 줄어들면서 해외에서 생활하는 학생들도, 또 돈을 보내는 부모님들도 그만큼 힘들어졌는데요.​';
let scriptTest86_4 = new Script();
scriptTest86_4.startTime = new Time(18, 31);
scriptTest86_4.endTime = new Time(21, 96);
scriptTest86_4.text = '뉴욕에서 이용주 특파원이 유학생들을 만나봤습니다.';

// 87번 뉴스
let tagTest87_1 = new Tag();
tagTest87_1.name = '코로나19';
let tagTest87_2 = new Tag();
tagTest87_2.name = '거리두기';
let tagTest87_3 = new Tag();
tagTest87_3.name = '서울';

let scriptTest87_1 = new Script();
scriptTest87_1.startTime = new Time(0, 0);
scriptTest87_1.endTime = new Time(7, 86);
scriptTest87_1.text = '거리두기가 2단계로 격상된 서울, 경기지역에서는 이제 실외에서도 백 명이 넘는 모임은 자제해야 합니다.';
let scriptTest87_2 = new Script();
scriptTest87_2.startTime = new Time(7, 86);
scriptTest87_2.endTime = new Time(16, 83);
scriptTest87_2.text = '또 최근 관중을 조금씩 늘려온 스포츠 경기는 내일부터 무관중 경기로 돌아가고, 학교 원격수업, 공공기관 재택근무도 늘어납니다.';
let scriptTest87_3 = new Script();
scriptTest87_3.startTime = new Time(16, 83);
scriptTest87_3.endTime = new Time(23, 37);
scriptTest87_3.text = '불가피하게 다시 위축돼야만 하는 우리 일상, 무엇이 달라지는지 송금한 기자가 정리했습니다.​';

// 88번 뉴스
let tagTest88_1 = new Tag();
tagTest88_1.name = '우상혁';
let tagTest88_2 = new Tag();
tagTest88_2.name = '다이아몬드리그';
let tagTest88_3 = new Tag();
tagTest88_3.name = '우승';

let scriptTest88_1 = new Script();
scriptTest88_1.startTime = new Time(0, 0);
scriptTest88_1.endTime = new Time(9, 53);
scriptTest88_1.text = '높이뛰기의 희망 우상혁 선수가 첫 출전한 다이아몬드 리그에서 한국 육상 사상 첫 우승을 차지하며 새 역사를 써냈습니다.';
let scriptTest88_2 = new Script();
scriptTest88_2.startTime = new Time(9, 53);
scriptTest88_2.endTime = new Time(18, 10);
scriptTest88_2.text = '세계 정상급 선수들이 출전하는 대회에서 우상혁 선수는 특유의 긍정 에너지로 올림픽 챔피언까지 꺾으며 정상에 섰습니다.';
let scriptTest88_3 = new Script();
scriptTest88_3.startTime = new Time(18, 10);
scriptTest88_3.endTime = new Time(20, 97);
scriptTest88_3.text = '문영규 기자의 보도입니다.​';

// 89번 뉴스
let tagTest89_1 = new Tag();
tagTest89_1.name = '윤석열';
let tagTest89_2 = new Tag();
tagTest89_2.name = '대통령';
let tagTest89_3 = new Tag();
tagTest89_3.name = '검찰';

let scriptTest89_1 = new Script();
scriptTest89_1.startTime = new Time(0, 0);
scriptTest89_1.endTime = new Time(2, 99);
scriptTest89_1.text = '아마 많은 국민들이 같은 마음일 겁니다.';
let scriptTest89_2 = new Script();
scriptTest89_2.startTime = new Time(2, 99);
scriptTest89_2.endTime = new Time(7, 28);
scriptTest89_2.text = '윤석열 당선인은 서울에서 태어나 서울대 법대를 졸업했습니다.';
let scriptTest89_3 = new Script();
scriptTest89_3.startTime = new Time(7, 28);
scriptTest89_3.endTime = new Time(14, 24);
scriptTest89_3.text = '9번 만에 사법시험에 붙는 늦깎이였지만 검찰총장을 지내며 \'적폐 청산 수사\'를 진두지휘했고,​';
let scriptTest89_4 = new Script();
scriptTest89_4.startTime = new Time(14, 24);
scriptTest89_4.endTime = new Time(20, 66);
scriptTest89_4.text = '정치에 뛰어든 후에는 여의도의 숱한 정치인들을 물리치며 대통령에 당선되는 파란을 만들어냈습니다.';
let scriptTest89_5 = new Script();
scriptTest89_5.startTime = new Time(20, 66);
scriptTest89_5.endTime = new Time(22, 56);
scriptTest89_5.text = '정규진 기자입니다.';

// 90번 뉴스
let tagTest90_1 = new Tag();
tagTest90_1.name = '오징어게임';
let tagTest90_2 = new Tag();
tagTest90_2.name = '이정재';
let tagTest90_3 = new Tag();
tagTest90_3.name = '뉴욕타임스';

let scriptTest90_1 = new Script();
scriptTest90_1.startTime = new Time(0, 0);
scriptTest90_1.endTime = new Time(8, 51);
scriptTest90_1.text = '세계적으로 인기를 끈 넷플릭스 드라마 \'오징어게임\'의 주연 배우 이정재가 뉴욕타임스의 올해 문화계 샛별로 선정됐습니다.';
let scriptTest90_2 = new Script();
scriptTest90_2.startTime = new Time(8, 51);
scriptTest90_2.endTime = new Time(16, 16);
scriptTest90_2.text = '뉴욕타임스는 올해 음악과 영화, 연극 등 문화계에서 새롭게 두각을 나타낸 스타로 TV 분야에서는 이정재를 꼽았습니다.';
let scriptTest90_3 = new Script();
scriptTest90_3.startTime = new Time(16, 16);
scriptTest90_3.endTime = new Time(29, 15);
scriptTest90_3.text = '뉴욕타임스는 이정재가 한국에서 여러 영화에 출연한 모델 출신 연기자라고 소개하며 빚더미에 앉은 도박 중독자 성기훈을 비통하면서도 놀랄 정도로 섬세하게 그려냈다고 평가했습니다.​';

// 91번 뉴스
let tagTest91_1 = new Tag();
tagTest91_1.name = '루나';
let tagTest91_2 = new Tag();
tagTest91_2.name = '금융사기';
let tagTest91_3 = new Tag();
tagTest91_3.name = 'IMF';

let scriptTest91_1 = new Script();
scriptTest91_1.startTime = new Time(0, 0);
scriptTest91_1.endTime = new Time(5, 75);
scriptTest91_1.text = '국내는 물론 해외까지 파장을 미치고 있는 가상화폐 \'루나\'의 폭락 사태.';
let scriptTest91_2 = new Script();
scriptTest91_2.startTime = new Time(5, 75);
scriptTest91_2.endTime = new Time(13, 89);
scriptTest91_2.text = '국제통화기금 총재가 "피라미드 사기"라고까지 언급하고 나섰는데, 검찰과 경찰의 수사 속도도 빨라지고 있습니다.';
let scriptTest91_3 = new Script();
scriptTest91_3.startTime = new Time(13, 89);
scriptTest91_3.endTime = new Time(19, 89);
scriptTest91_3.text = '금융당국은 루나 가격이 떨어지기 시작한 뒤 거래량이 오히려 더 늘어난 것으로 분석했습니다.​';
let scriptTest91_4 = new Script();
scriptTest91_4.startTime = new Time(19, 89);
scriptTest91_4.endTime = new Time(22, 20);
scriptTest91_4.text = '김상훈 기자의 보도입니다.';

// 92번 뉴스
let tagTest92_1 = new Tag();
tagTest92_1.name = '미술품';
let tagTest92_2 = new Tag();
tagTest92_2.name = '롯데월드몰';
let tagTest92_3 = new Tag();
tagTest92_3.name = '경찰';

let scriptTest92_1 = new Script();
scriptTest92_1.startTime = new Time(0, 0);
scriptTest92_1.endTime = new Time(8, 12);
scriptTest92_1.text = '서울 롯데월드몰에 전시된 5억 원 상당의 미술품에 누군가 낙서를 하면서 경찰이 출동하는 일이 있었습니다.';
let scriptTest92_2 = new Script();
scriptTest92_2.startTime = new Time(8, 12);
scriptTest92_2.endTime = new Time(17, 68);
scriptTest92_2.text = '그림에 덧칠을 한 건 20대 남녀였는데 알록달록한 대형 작품 앞에 붓과 페인트통이 놓여있어서 참여 예술인 줄 알았다고 말했습니다.';
let scriptTest92_3 = new Script();
scriptTest92_3.startTime = new Time(17, 68);
scriptTest92_3.endTime = new Time(19, 72);
scriptTest92_3.text = '유수환 기자입니다.​';

// 93번 뉴스
let tagTest93_1 = new Tag();
tagTest93_1.name = '더불어민주당';
let tagTest93_2 = new Tag();
tagTest93_2.name = '지방선거';
let tagTest93_3 = new Tag();
tagTest93_3.name = '선거참패';

let scriptTest93_1 = new Script();
scriptTest93_1.startTime = new Time(0, 0);
scriptTest93_1.endTime = new Time(9, 27);
scriptTest93_1.text = '이번 지방선거에서 더불어민주당이 고전할 거라는 건 대부분 예상했지만, 성적표 받아보니 예상보다 더 참담했습니다.';
let scriptTest93_2 = new Script();
scriptTest93_2.startTime = new Time(9, 27);
scriptTest93_2.endTime = new Time(22, 64);
scriptTest93_2.text = '대선 끝나고 석 달도 안 돼 치러져서 정부와 여당에 유리한 선거였던 건 맞지만 대선에서 왜 졌는지에 대한 민주당의 반성과 쇄신이 없었던 게 패배의 핵심 원인이었다는 지적이 나오고 있습니다.';
let scriptTest93_3 = new Script();
scriptTest93_3.startTime = new Time(22, 64);
scriptTest93_3.endTime = new Time(24, 87);
scriptTest93_3.text = '김재경 기자의 보도입니다.​';

// 94번 뉴스
let tagTest94_1 = new Tag();
tagTest94_1.name = '금리';
let tagTest94_2 = new Tag();
tagTest94_2.name = '백스텝';
let tagTest94_3 = new Tag();
tagTest94_3.name = '한국은행';

let scriptTest94_1 = new Script();
scriptTest94_1.startTime = new Time(7, 23);
scriptTest94_1.endTime = new Time(13, 88);
scriptTest94_1.text = '화제의 경제 뉴스를 빠르게 전해드리는 신선한 경제 시간입니다.';
let scriptTest94_2 = new Script();
scriptTest94_2.startTime = new Time(13, 88);
scriptTest94_2.endTime = new Time(22, 98);
scriptTest94_2.text = '한국은행이 어제 기준금리를 한꺼번에 0.5%포인트 올리는 빅스텝에 나서면서 금리가 2.25%까지 상승했는데요.';
let scriptTest94_3 = new Script();
scriptTest94_3.startTime = new Time(22, 98);
scriptTest94_3.endTime = new Time(27, 6);
scriptTest94_3.text = '오늘부터 일부 시중은행의 예적금 금리도 오릅니다.​';
let scriptTest94_4 = new Script();
scriptTest94_4.startTime = new Time(27, 6);
scriptTest94_4.endTime = new Time(35, 72);
scriptTest94_4.text = '하나은행은 오늘부터 예적금 30종의 기본 금리를 0.25%포인트에서 최대 0.9%포인트 올리기로 했습니다.';
let scriptTest94_5 = new Script();
scriptTest94_5.startTime = new Time(35, 72);
scriptTest94_5.endTime = new Time(44, 5);
scriptTest94_5.text = '이에 따라 1년 만기 적금 상품의 금리는 5.5%까지, 1년짜리의 정기 예금은 2.8%로 오르는데요.​';
let scriptTest94_6 = new Script();
scriptTest94_6.startTime = new Time(44, 5);
scriptTest94_6.endTime = new Time(59, 71);
scriptTest94_6.text = '금융당국의 예대금리차 축소 압박에 기존금리 인상분을 예적금 금리에 재빠르게 반영한 것으로 보이는데 NH농협은행은 역시 내일부터 예적금 금리를 최대 0.6%포인트 올리는 등 금리 조정에 나설 것으로 예상됩니다.';
let scriptTest94_7 = new Script();
scriptTest94_7.startTime = new Time(59, 71);
scriptTest94_7.endTime = new Time(69, 41);
scriptTest94_7.text = '연말까지 기준금리가 최대 3%까지 오를 것으로 전망되고 있는 만큼 예적금에 가입한다면 만기는 되도록 짧게 가져가는 게 유리합니다.';

// 95번 뉴스
let tagTest95_1 = new Tag();
tagTest95_1.name = '월드컵';
let tagTest95_2 = new Tag();
tagTest95_2.name = '조추첨';
let tagTest95_3 = new Tag();
tagTest95_3.name = '벤투호';

let scriptTest95_1 = new Script();
scriptTest95_1.startTime = new Time(0, 0);
scriptTest95_1.endTime = new Time(10, 95);
scriptTest95_1.text = '벤투 감독이 이끄는 축구 대표팀이 카타르 월드컵 아시아 지역 최종 예선 조 추첨에서 중동 팀들과 한 조에 묶이는 역대 최악의 조에 편성됐습니다.';
let scriptTest95_2 = new Script();
scriptTest95_2.startTime = new Time(10, 95);
scriptTest95_2.endTime = new Time(20, 26);
scriptTest95_2.text = '우리나라는 말레이시아에서 열린 조 추첨에서 이란과 아랍에미리트, 이라크와 시리아, 레바논 등 중동 국가와 A조에 포함됐습니다.';
let scriptTest95_3 = new Script();
scriptTest95_3.startTime = new Time(20, 26);
scriptTest95_3.endTime = new Time(29, 69);
scriptTest95_3.text = '중동 팀들과만 한 조에 묶인 건 홈 앤드 어웨이 방식이 시작된 이후 처음으로, 강호 이란과는 4회 연속 같은 조에서 맞붙게 됐습니다.​';
let scriptTest95_4 = new Script();
scriptTest95_4.startTime = new Time(29, 69);
scriptTest95_4.endTime = new Time(35, 48);
scriptTest95_4.text = '대표팀은 오는 9월 2일, 홈에서 이라크와 첫 경기를 치릅니다.';

// 96번 뉴스
let tagTest96_1 = new Tag();
tagTest96_1.name = '미국';
let tagTest96_2 = new Tag();
tagTest96_2.name = '금리';
let tagTest96_3 = new Tag();
tagTest96_3.name = '연방준비제도';

let scriptTest96_1 = new Script();
scriptTest96_1.startTime = new Time(0, 0);
scriptTest96_1.endTime = new Time(10, 34);
scriptTest96_1.text = '미국 연방준비제도가 기준금리를 0.75%포인트 인상할 것으로 보여 한국과 미국의 기준금리 역전이 불가피할 전망입니다.';
let scriptTest96_2 = new Script();
scriptTest96_2.startTime = new Time(10, 34);
scriptTest96_2.endTime = new Time(19, 86);
scriptTest96_2.text = '외신에 따르면 연준이 오는 27일 연방공개시장위원회 회의에서 기준금리를 0.75%포인트 인상하는 것이 확실시되고 있습니다.';
let scriptTest96_3 = new Script();
scriptTest96_3.startTime = new Time(19, 86);
scriptTest96_3.endTime = new Time(30, 31);
scriptTest96_3.text = '연준이 예상대로 결정하면 미국 기준금리는 오는 27일에 1.5∼1.75%에서 2.25∼2.5%로 오르게 됩니다.​';
let scriptTest96_4 = new Script();
scriptTest96_4.startTime = new Time(30, 31);
scriptTest96_4.endTime = new Time(38, 39);
scriptTest96_4.text = '이렇게 되면 현재 한국의 기준금리 2.25%보다 높아져 한미 기준금리가 역전됩니다.';

// 97번 뉴스
let tagTest97_1 = new Tag();
tagTest97_1.name = '코로나';
let tagTest97_2 = new Tag();
tagTest97_2.name = '유학생';
let tagTest97_3 = new Tag();
tagTest97_3.name = '미국대학';

let scriptTest97_1 = new Script();
scriptTest97_1.startTime = new Time(0, 0);
scriptTest97_1.endTime = new Time(11, 74);
scriptTest97_1.text = '코로나 사태 속에서 미국 트럼프 대통령이 올가을에 미국 대학에 입학하는 외국인 유학생 중에 인터넷 수업만 듣는 경우는 비자를 내주지 않겠다고 공식 발표를 했습니다.';
let scriptTest97_2 = new Script();
scriptTest97_2.startTime = new Time(11, 74);
scriptTest97_2.endTime = new Time(18, 19);
scriptTest97_2.text = '우리나라 학생들까지, 전 세계에서 25만 명이 합격증 받아 놓고 미국에 못 갈 상황입니다.';
let scriptTest97_3 = new Script();
scriptTest97_3.startTime = new Time(18, 19);
scriptTest97_3.endTime = new Time(20, 17);
scriptTest97_3.text = '김영아 기자입니다.​';

// 98번 뉴스
let tagTest98_1 = new Tag();
tagTest98_1.name = '차별';
let tagTest98_2 = new Tag();
tagTest98_2.name = '예멘';
let tagTest98_3 = new Tag();
tagTest98_3.name = '내전';

let scriptTest98_1 = new Script();
scriptTest98_1.startTime = new Time(0, 0);
scriptTest98_1.endTime = new Time(6, 63);
scriptTest98_1.text = '이번에는 내전 중인 고국을 떠나 한국에 왔던 한 예멘 청년의 이야기를 전해 드립니다.';
let scriptTest98_2 = new Script();
scriptTest98_2.startTime = new Time(6, 63);
scriptTest98_2.endTime = new Time(15, 32);
scriptTest98_2.text = '우리나라를 제2의 고향으로 삼고 싶었다던 청년은 차별과 냉대를 견디다 못해 4년 만에 다른 나라로 떠나고 말았는데요.';
let scriptTest98_3 = new Script();
scriptTest98_3.startTime = new Time(15, 32);
scriptTest98_3.endTime = new Time(21, 76);
scriptTest98_3.text = '우리 사회가 반성해야 할 부분은 없는지 신정은 기자가 모하메드 이야기를 취재했습니다.​';

// 99번 뉴스
let tagTest99_1 = new Tag();
tagTest99_1.name = '부동산';
let tagTest99_2 = new Tag();
tagTest99_2.name = '전세대출';
let tagTest99_3 = new Tag();
tagTest99_3.name = '금리';

let scriptTest99_1 = new Script();
scriptTest99_1.startTime = new Time(8, 84);
scriptTest99_1.endTime = new Time(13, 65);
scriptTest99_1.text = '화제의 경제 뉴스를 빠르게 전해드리는 신선한 경제 시간입니다.';
let scriptTest99_2 = new Script();
scriptTest99_2.startTime = new Time(13, 65);
scriptTest99_2.endTime = new Time(18, 63);
scriptTest99_2.text = '전세자금 대출 금리가 약 12년 만에 6%를 넘었습니다.';
let scriptTest99_3 = new Script();
scriptTest99_3.startTime = new Time(18, 63);
scriptTest99_3.endTime = new Time(26, 98);
scriptTest99_3.text = '지난 16일 기준 4대 시중 은행 전세 자금 대출 금리는 연 4 ~ 6.2%로 나타났습니다.​';
let scriptTest99_4 = new Script();
scriptTest99_4.startTime = new Time(26, 98);
scriptTest99_4.endTime = new Time(34, 29);
scriptTest99_4.text = '전세 대출 금리에 연동되는 코픽스가 2.38%까지 급등하면서 최고 금리가 6%를 넘은 건데요.';
let scriptTest99_5 = new Script();
scriptTest99_5.startTime = new Time(34, 29);
scriptTest99_5.endTime = new Time(45, 26);
scriptTest99_5.text = '임대차법 시행 이후 전셋값이 치솟은 상황에서 대출 금리마저 급등하면 세입자들의 부담은 더욱 커지고 보증금을 감당하지 못하면 월세로 내몰릴 수밖에 없는데요.​';
let scriptTest99_6 = new Script();
scriptTest99_6.startTime = new Time(45, 26);
scriptTest99_6.endTime = new Time(57, 39);
scriptTest99_6.text = '실제로 올 상반기 서울에서 월세가 낀 아파트 임대차 거래량은 4만 2000여건으로 역대 최다를 기록해 전세의 월세화가 가속화되고 있는 것으로 나타났습니다.';

// 100번 뉴스
let tagTest100_1 = new Tag();
tagTest100_1.name = '변희수하사';
let tagTest100_2 = new Tag();
tagTest100_2.name = '강제전역';
let tagTest100_3 = new Tag();
tagTest100_3.name = '성소수자';

let scriptTest100_1 = new Script();
scriptTest100_1.startTime = new Time(0, 0);
scriptTest100_1.endTime = new Time(8, 59);
scriptTest100_1.text = '성전환 수술을 한 뒤에도 계속 군 복무를 원했던 육군 하사를 군 당국이 강제 전역시켰습니다.';
let scriptTest100_2 = new Script();
scriptTest100_2.startTime = new Time(8, 59);
scriptTest100_2.endTime = new Time(17, 46);
scriptTest100_2.text = '군은 성전환 수술에 따른 신체 변화를 일종의 부상으로 간주하고 오늘 밤 12시 전역하라는 결정을 내렸습니다.';
let scriptTest100_3 = new Script();
scriptTest100_3.startTime = new Time(17, 46);
scriptTest100_3.endTime = new Time(24, 97);
scriptTest100_3.text = '개인적 사유에 대한 판단이 아니라, 관계 법령에 근거한 적법한 결정이라는 게 군 당국의 설명입니다.​';
let scriptTest100_4 = new Script();
scriptTest100_4.startTime = new Time(24, 97);
scriptTest100_4.endTime = new Time(33, 26);
scriptTest100_4.text = '군의 통보를 받은 육군 하사는 성 정체성을 떠나서 훌륭한 군인이 되는 걸 보여주고 싶었다며 오늘 기자회견을 열었습니다.';
let scriptTest100_5 = new Script();
scriptTest100_5.startTime = new Time(33, 26);
scriptTest100_5.endTime = new Time(37,60);
scriptTest100_5.text = '김아영 기자 리포트 먼저 보시고 좀 더 이야기를 해보겠습니다.​';

// 101번 뉴스
let tagTest101_1 = new Tag();
tagTest101_1.name = '변희수하사';
let tagTest101_2 = new Tag();
tagTest101_2.name = '강제전역';
let tagTest101_3 = new Tag();
tagTest101_3.name = '취소판결';

let scriptTest101_1 = new Script();
scriptTest101_1.startTime = new Time(0, 0);
scriptTest101_1.endTime = new Time(6, 82);
scriptTest101_1.text = '자신의 성 정체성을 깨닫고 남성에서 여성으로 성전환 수술을 받은 군인이 있었습니다.';
let scriptTest101_2 = new Script();
scriptTest101_2.startTime = new Time(6, 82);
scriptTest101_2.endTime = new Time(13, 93);
scriptTest101_2.text = '국가를 위해서 군인으로 남겠다는 각오를 밝혔지만, 군은 받아들이지 않았고, 강제로 전역을 시켰습니다.';
let scriptTest101_3 = new Script();
scriptTest101_3.startTime = new Time(13, 93);
scriptTest101_3.endTime = new Time(15, 75);
scriptTest101_3.text = '고 변희수 하사 이야기입니다.';
let scriptTest101_4 = new Script();
scriptTest101_4.startTime = new Time(15, 75);
scriptTest101_4.endTime = new Time(18, 97);
scriptTest101_4.text = '변 하사가 세상을 떠난 이후에도 소송은 계속됐습니다.';
let scriptTest101_5 = new Script();
scriptTest101_5.startTime = new Time(18, 97);
scriptTest101_5.endTime = new Time(26,61);
scriptTest101_5.text = '결국 법원은 강제 전역이 잘못된 거라고 변 하사 손을 들어줬고, 이번 주에 이 판결이 확정됐습니다.​';
let scriptTest101_6 = new Script();
scriptTest101_6.startTime = new Time(26, 61);
scriptTest101_6.endTime = new Time(28, 42);
scriptTest101_6.text = '오늘 이 내용을 짚어보겠습니다.';
let scriptTest101_7 = new Script();
scriptTest101_7.startTime = new Time(28, 42);
scriptTest101_7.endTime = new Time(33, 6);
scriptTest101_7.text = '먼저 지형철 기자의 리포트를 보시고 법률 전문가와 더 얘기해보겠습니다.​';

// 102번 뉴스
let tagTest102_1 = new Tag();
tagTest102_1.name = '국회의원';
let tagTest102_2 = new Tag();
tagTest102_2.name = '지역구';
let tagTest102_3 = new Tag();
tagTest102_3.name = '취소판결';

let scriptTest102_1 = new Script();
scriptTest102_1.startTime = new Time(0, 0);
scriptTest102_1.endTime = new Time(9, 53);
scriptTest102_1.text = '새누리당 김무성 대표가 이재오·주호영 의원 등 비박계 주요 의원들이 공천 탈락한 것과 관련해 이를 수용할 수 없다는 견해를 밝혔습니다.';
let scriptTest102_2 = new Script();
scriptTest102_2.startTime = new Time(9, 53);
scriptTest102_2.endTime = new Time(25, 57);
scriptTest102_2.text = '김 대표는 오늘 국회에서 기자간담회를 열고 "이재오 의원의 지역구인 서울 은평을을 포함한 7개 지역의 단수후보 추천 결과와 주호영 의원이 재심을 신청한 대구 수성을의 여성 우선추천지역 선정 결과에 대해 문제가 있다"고 지적했습니다.';
let scriptTest102_3 = new Script();
scriptTest102_3.startTime = new Time(25, 57);
scriptTest102_3.endTime = new Time(40, 37);
scriptTest102_3.text = '김 대표는 원내대표를 두 차례 한 이재오 의원은 김대중·노무현 정권 때 가장 앞장서 싸워왔던 대표적 인물로, 우리 당에서 다섯 차례나 공천된 사람을 정체성이 맞지 않다고 하는 것은 이해할 수 없다고 말했습니다.';
let scriptTest102_4 = new Script();
scriptTest102_4.startTime = new Time(40, 37);
scriptTest102_4.endTime = new Time(56, 68);
scriptTest102_4.text = '주호영 의원도 공무원연금개혁위원장으로 개혁 완수에 큰 역할을 했고 국회 정보위원장으로서 테러방지법을 통과시키는 데 큰 역할을 한 분으로, 지역구 활동도 잘해 경쟁자가 오지 않아 단독 신청한 지역이라고 말했습니다.';

// 103번 뉴스
let tagTest103_1 = new Tag();
tagTest103_1.name = '북한';
let tagTest103_2 = new Tag();
tagTest103_2.name = '국정원';
let tagTest103_3 = new Tag();
tagTest103_3.name = '김정은';

let scriptTest103_1 = new Script();
scriptTest103_1.startTime = new Time(0, 0);
scriptTest103_1.endTime = new Time(8, 4);
scriptTest103_1.text = '국가정보원이 2018년 판문점 정상회담 당시 김정은 위원장에게 제공된 USB 내용을 들여다보고 있는 것으로 확인됐습니다.';
let scriptTest103_2 = new Script();
scriptTest103_2.startTime = new Time(8, 4);
scriptTest103_2.endTime = new Time(13, 87);
scriptTest103_2.text = 'USB 안에 \'북한 원전 건설\' 관련 내용이 있느냐를 두고 정치권 공방이 일기도 있는데,';
let scriptTest103_3 = new Script();
scriptTest103_3.startTime = new Time(13, 87);
scriptTest103_3.endTime = new Time(17, 69);
scriptTest103_3.text = '원전 내용이 포함됐는지를 국정원이 분석하고 있습니다.';
let scriptTest103_4 = new Script();
scriptTest103_4.startTime = new Time(17, 69);
scriptTest103_4.endTime = new Time(20, 4);
scriptTest103_4.text = '홍진아 기자가 보도합니다.';

// 104번 뉴스
let tagTest104_1 = new Tag();
tagTest104_1.name = '북한';
let tagTest104_2 = new Tag();
tagTest104_2.name = '북한경제';
let tagTest104_3 = new Tag();
tagTest104_3.name = '통계청';

let scriptTest104_1 = new Script();
scriptTest104_1.startTime = new Time(0, 0);
scriptTest104_1.endTime = new Time(5, 4);
scriptTest104_1.text = '코로나19가 전 세계를 휩쓰는 상황이 2년째 이어지고 있죠.';
let scriptTest104_2 = new Script();
scriptTest104_2.startTime = new Time(5, 4);
scriptTest104_2.endTime = new Time(12, 55);
scriptTest104_2.text = '이미 유엔의 대북 제재를 받고 있던 북한은 코로나19까지 덮치면서 경제가 더욱 악화된 것으로 파악됐습니다.';
let scriptTest104_3 = new Script();
scriptTest104_3.startTime = new Time(12, 55);
scriptTest104_3.endTime = new Time(16, 96);
scriptTest104_3.text = '오늘의 그래픽 뉴스에서는 [북한 경제]를 한번 짚어보겠습니다.';
let scriptTest104_4 = new Script();
scriptTest104_4.startTime = new Time(16, 96);
scriptTest104_4.endTime = new Time(27, 51);
scriptTest104_4.text = '오늘 통계청이 발표한 \'북한 주요 통계지표\'에 따르면, 2020년 북한의 인구는 2,537만 명으로 남한의 절반 수준으로 나타났습니다.';
let scriptTest104_5 = new Script();
scriptTest104_5.startTime = new Time(27, 51);
scriptTest104_5.endTime = new Time(47, 14);
scriptTest104_5.text = '남북한의 인구를 합한 총인구는 7,720만 명으로 집계됐는데요. 인구 비중을 따져보면 북한은 0∼14세 인구가 19.8%로 남한보다 7.6%포인트 높고, 65세 이상은 10%로 남한보다 5.%7포인트 낮았습니다.';
let scriptTest104_6 = new Script();
scriptTest104_6.startTime = new Time(47, 14);
scriptTest104_6.endTime = new Time(50, 61);
scriptTest104_6.text = '고령인구 비율은 수명과도 관련이 있죠.';
let scriptTest104_7 = new Script();
scriptTest104_7.startTime = new Time(50, 61);
scriptTest104_7.endTime = new Time(61, 41);
scriptTest104_7.text = '북한의 기대수명은 남자 66.9세, 여자 73.6세로 남한의 기대수명보다 각각 13.6세, 12.9세 짧았습니다.';
let scriptTest104_8 = new Script();
scriptTest104_8.startTime = new Time(61, 41);
scriptTest104_8.endTime = new Time(68, 81);
scriptTest104_8.text = '지난해 북한 실질 국내총생산, GDP는 전년보다 4.5% 감소했습니다.';
let scriptTest104_9 = new Script();
scriptTest104_9.startTime = new Time(68, 81);
scriptTest104_9.endTime = new Time(76, 66);
scriptTest104_9.text = '이는 최악의 식량난을 겪던 이른바 \'고난의 행군\' 시기인 1997년 이후 최대폭의 역성장인데요.';
let scriptTest104_10 = new Script();
scriptTest104_10.startTime = new Time(76, 66);
scriptTest104_10.endTime = new Time(86, 57);
scriptTest104_10.text = '1인당 GNI, 즉 1인당 국민 총소득은 137.9만 원으로 남한의 27분의 1 수준에 불과한 것으로 나타났습니다.';
let scriptTest104_11 = new Script();
scriptTest104_11.startTime = new Time(86, 57);
scriptTest104_11.endTime = new Time(90, 81);
scriptTest104_11.text = '남북한의 소득 격차는 점차 확대되는 추세입니다.';
let scriptTest104_12 = new Script();
scriptTest104_12.startTime = new Time(90, 81);
scriptTest104_12.endTime = new Time(95, 71);
scriptTest104_12.text = '북한 경제의 역성장 이유로는 대외 무역의 감소가 꼽힙니다.';
let scriptTest104_13 = new Script();
scriptTest104_13.startTime = new Time(95, 71);
scriptTest104_13.endTime = new Time(103, 25);
scriptTest104_13.text = '대북 제재로 이미 어렵던 북한 무역은 코로나19 이후 국경 봉쇄가 거듭되면서 더 큰 타격을 받고 있는데요.';
let scriptTest104_14 = new Script();
scriptTest104_14.startTime = new Time(103, 25);
scriptTest104_14.endTime = new Time(111, 21);
scriptTest104_14.text = '지난해 북한의 무역총액은 8억6천만 달러로 전년보다 무려 73.4% 감소했습니다.';
let scriptTest104_15 = new Script();
scriptTest104_15.startTime = new Time(111, 21);
scriptTest104_15.endTime = new Time(115, 44);
scriptTest104_15.text = '남한의 무역총액이 6%대로 감소한 것과는 차이가 큽니다.';
let scriptTest104_16 = new Script();
scriptTest104_16.startTime = new Time(115, 44);
scriptTest104_16.endTime = new Time(119, 72);
scriptTest104_16.text = '이런 가운데 식량 사정마저 점점 어려워지고 있습니다.';
let scriptTest104_17 = new Script();
scriptTest104_17.startTime = new Time(119, 72);
scriptTest104_17.endTime = new Time(129, 76);
scriptTest104_17.text = '작년 쌀, 보리 등 식량작물 생산량은 440만t으로 남한보다는 많았지만, 전년과 비교해 5.2% 감소했는데요.';
let scriptTest104_18 = new Script();
scriptTest104_18.startTime = new Time(129, 76);
scriptTest104_18.endTime = new Time(135, 61);
scriptTest104_18.text = '특히 식량작물 중 쌀은 202만t으로 9.6%나 감소했습니다.';
let scriptTest104_19 = new Script();
scriptTest104_19.startTime = new Time(135, 61);
scriptTest104_19.endTime = new Time(147, 67);
scriptTest104_19.text = '한편 북한에서 한 사람이 하루에 공급받는 에너지양은 2천19㎉로 전년보다 0.5% 감소했고요, 이는 남한 67% 수준으로 추정됐습니다.';
let scriptTest104_20 = new Script();
scriptTest104_20.startTime = new Time(147, 67);
scriptTest104_20.endTime = new Time(149, 78);
scriptTest104_20.text = '지금까지 그래픽 뉴스였습니다.';

// 105번 뉴스
let tagTest105_1 = new Tag();
tagTest105_1.name = 'IPEF';
let tagTest105_2 = new Tag();
tagTest105_2.name = '미국';
let tagTest105_3 = new Tag();
tagTest105_3.name = '중국';

let scriptTest105_1 = new Script();
scriptTest105_1.startTime = new Time(0, 0);
scriptTest105_1.endTime = new Time(11, 58);
scriptTest105_1.text = '조 바이든 미국 대통령과 정상회담을 통해 한미동맹을 다진 윤석열 대통령이 오늘 오후 IPEF 출범 선언 정상회의에 화상으로 참석했습니다.';
let scriptTest105_2 = new Script();
scriptTest105_2.startTime = new Time(11, 58);
scriptTest105_2.endTime = new Time(17, 86);
scriptTest105_2.text = '한미 양국의 경제, 안보 공조가 IPEF를 계기로 더 본격화할 전망인데요.';
let scriptTest105_3 = new Script();
scriptTest105_3.startTime = new Time(17, 86);
scriptTest105_3.endTime = new Time(20, 45);
scriptTest105_3.text = '오늘의 그래픽 뉴스, [IPEF]입니다.';
let scriptTest105_4 = new Script();
scriptTest105_4.startTime = new Time(20, 45);
scriptTest105_4.endTime = new Time(31, 7);
scriptTest105_4.text = 'IPEF, 인도태평양경제프레임워크는 바이든 미 대통령이 지난해 제시한 인도 태평양 지역 경제 안보 협력체입니다.';
let scriptTest105_5 = new Script();
scriptTest105_5.startTime = new Time(31, 7);
scriptTest105_5.endTime = new Time(43, 27);
scriptTest105_5.text = '공정하고 회복력 있는 무역, 공급망 안정성, 청정에너지 및 탈탄소화, 조세 및 반부패 등 총 4개 분야를 참여국 간의 협력 의제로 다루게 되는데요.';
let scriptTest105_6 = new Script();
scriptTest105_6.startTime = new Time(43, 27);
scriptTest105_6.endTime = new Time(52, 31);
scriptTest105_6.text = '참여국을 살펴보면 한국과 미국을 비롯해서 일본, 호주, 뉴질랜드, 싱가포르 등 모두 13개 국가입니다.';
let scriptTest105_7 = new Script();
scriptTest105_7.startTime = new Time(52, 31);
scriptTest105_7.endTime = new Time(60, 35);
scriptTest105_7.text = '보시는 것처럼 중국이 주도하는 알셉(RCEP), 즉 역내포괄적경제동반자협정의 참여국들과도 맞물려 있는데요.';
let scriptTest105_8 = new Script();
scriptTest105_8.startTime = new Time(60, 35);
scriptTest105_8.endTime = new Time(71, 19);
scriptTest105_8.text = '때문에 IPEF의 출범이 인도 태평양 지역에서 중국의 영향력 확대를 억제하기 위한 미국의 \'대중국 견제\'의 성격을 띠고 있다는 평가도 나옵니다.';
let scriptTest105_9 = new Script();
scriptTest105_9.startTime = new Time(71, 19);
scriptTest105_9.endTime = new Time(80, 8);
scriptTest105_9.text = '윤석열 대통령은 이번 한미 정상회담을 계기로 IPEF에서 주도적인 역할을 하겠다는 방침을 확고하게 밝힌 바가 있죠.';
let scriptTest105_10 = new Script();
scriptTest105_10.startTime = new Time(80, 8);
scriptTest105_10.endTime = new Time(88, 16);
scriptTest105_10.text = '윤 대통령은 오늘 열린 IPEF 고위급 화상회의에 참석해 13개국 중 5번째로 발언했습니다.';
let scriptTest105_11 = new Script();
scriptTest105_11.startTime = new Time(88, 16);
scriptTest105_11.endTime = new Time(98, 86);
scriptTest105_11.text = '출범식 성격의 이날 회의에서는, 한국에 이어서 일본과의 정상회담을 마친 조 바이든 미국 대통령이 IPEF 출범을 공식 선언했는데요.';
let scriptTest105_12 = new Script();
scriptTest105_12.startTime = new Time(98, 86);
scriptTest105_12.endTime = new Time(102, 72);
scriptTest105_12.text = '중국은 불편한 속내를 감추지 않고 있습니다.';
let scriptTest105_13 = new Script();
scriptTest105_13.startTime = new Time(102, 72);
scriptTest105_13.endTime = new Time(115, 3);
scriptTest105_13.text = '왕이 중국 외교부장은 어제 "분열과 대항을 만드는 도모에는 반대한다"면서 IPEF에 대해 "미국의 지역 경제 패권을 지키는 정치적 도구"라고 견제했습니다.';
let scriptTest105_14 = new Script();
scriptTest105_14.startTime = new Time(115, 3);
scriptTest105_14.endTime = new Time(122, 54);
scriptTest105_14.text = '우리나라의 IPEF 참여가 중국과 외교적, 경제적 마찰을 초래하는 것 아니냐 하는 우려도 나오는데요.';
let scriptTest105_15 = new Script();
scriptTest105_15.startTime = new Time(122, 54);
scriptTest105_15.endTime = new Time(136, 48);
scriptTest105_15.text = '이에 대해 박진 외교부 장관은 IPEF는 중국 견제용이 아니라면서 "중국이 IPEF에 참여할 수 있게 유도하는 역할을 한국이 할 수 있다"고 밝혔습니다. 지금까지 그래픽 뉴스였습니다.';

// 106번 뉴스
let tagTest106_1 = new Tag();
tagTest106_1.name = '북한';
let tagTest106_2 = new Tag();
tagTest106_2.name = '남북연락사무소';
let tagTest106_3 = new Tag();
tagTest106_3.name = '폐쇄';

let scriptTest106_1 = new Script();
scriptTest106_1.startTime = new Time(0, 0);
scriptTest106_1.endTime = new Time(1, 12);
scriptTest106_1.text = '다음 소식입니다.';
let scriptTest106_2 = new Script();
scriptTest106_2.startTime = new Time(1, 12);
scriptTest106_2.endTime = new Time(7, 71);
scriptTest106_2.text = '지난주 북한 김여정이 남북연락사무소 폐쇄를 공언했는데, 오늘 우여곡절이 있었습니다.';
let scriptTest106_3 = new Script();
scriptTest106_3.startTime = new Time(7, 71);
scriptTest106_3.endTime = new Time(15, 72);
scriptTest106_3.text = '오전에 북측이 우리 전화를 받지 않아 폐쇄에 들어가는 거냐는 관측이 나온 것인데, 오후에는 다시 통화가 됐습니다.';
let scriptTest106_4 = new Script();
scriptTest106_4.startTime = new Time(15, 72);
scriptTest106_4.endTime = new Time(18, 95);
scriptTest106_4.text = '북한의 속내가 뭔지 좀 더 관찰이 필요해 보입니다.';
let scriptTest106_5 = new Script();
scriptTest106_5.startTime = new Time(18, 95);
scriptTest106_5.endTime = new Time(21, 82);
scriptTest106_5.text = '안정식 북한전문기자입니다.';

// 107번 뉴스
let tagTest107_1 = new Tag();
tagTest107_1.name = '바이든';
let tagTest107_2 = new Tag();
tagTest107_2.name = '트럼프';
let tagTest107_3 = new Tag();
tagTest107_3.name = '의혹';

let scriptTest107_1 = new Script();
scriptTest107_1.startTime = new Time(0, 0);
scriptTest107_1.endTime = new Time(5, 21);
scriptTest107_1.text = '지금부터는 코앞으로 다가온 미국 대통령 선거 이야기를 좀 해보겠습니다.';
let scriptTest107_2 = new Script();
scriptTest107_2.startTime = new Time(5, 21);
scriptTest107_2.endTime = new Time(13, 54);
scriptTest107_2.text = 'TV 검증 무대에서, 민주당 조 바이든 후보의 시청률이 공화당 도널드 트럼프 대통령보다 높았던 것으로 나타났습니다.';
let scriptTest107_3 = new Script();
scriptTest107_3.startTime = new Time(13, 54);
scriptTest107_3.endTime = new Time(20, 63);
scriptTest107_3.text = '바이든 후보 측은 반색했지만, 차남을 둘러싼 의혹이 언론보도로 다시 불거지면서 곤혹스러운 상황이 됐는데요.';
let scriptTest107_4 = new Script();
scriptTest107_4.startTime = new Time(20, 63);
scriptTest107_4.endTime = new Time(23, 58);
scriptTest107_4.text = '워싱턴에서 임종주 특파원이 보도합니다.';

// 108번 뉴스
let tagTest108_1 = new Tag();
tagTest108_1.name = '반도체';
let tagTest108_2 = new Tag();
tagTest108_2.name = '인재양성';
let tagTest108_3 = new Tag();
tagTest108_3.name = '정원증원';

let scriptTest108_1 = new Script();
scriptTest108_1.startTime = new Time(0, 0);
scriptTest108_1.endTime = new Time(12, 67);
scriptTest108_1.text = '자, 이렇게 당장은 쉽지 않을 거라는 전망이 많지만, 그래도 정부는 반도체 산업이 우리 미래의 먹거리가 될 거라고 보고, 2031년까지 15만 명을 양성하기로 했습니다.';
let scriptTest108_2 = new Script();
scriptTest108_2.startTime = new Time(12, 67);
scriptTest108_2.endTime = new Time(19, 6);
scriptTest108_2.text = '그러기 위해서 반도체를 배울 수 있는 대학의 학과 정원을 2천 명까지 늘리기로 했습니다.';
let scriptTest108_3 = new Script();
scriptTest108_3.startTime = new Time(19, 6);
scriptTest108_3.endTime = new Time(21, 58);
scriptTest108_3.text = '이 내용은 김경희 기자가 전하겠습니다.';

// 109번 뉴스
let tagTest109_1 = new Tag();
tagTest109_1.name = '우상혁';
let tagTest109_2 = new Tag();
tagTest109_2.name = '높이뛰기';
let tagTest109_3 = new Tag();
tagTest109_3.name = '은메달';

let scriptTest109_1 = new Script();
scriptTest109_1.startTime = new Time(0, 0);
scriptTest109_1.endTime = new Time(2, 4);
scriptTest109_1.text = '다음 소식 이어가겠습니다.';
let scriptTest109_2 = new Script();
scriptTest109_2.startTime = new Time(2, 4);
scriptTest109_2.endTime = new Time(9, 2);
scriptTest109_2.text = '세계육상선수권대회 높이뛰기에서 우리나라 우상혁 선수가 사상 처음으로 2위에 올랐습니다.';
let scriptTest109_3 = new Script();
scriptTest109_3.startTime = new Time(9, 2);
scriptTest109_3.endTime = new Time(16, 18);
scriptTest109_3.text = '자기 키보다 50cm 정도 높은 2m 35cm를 훌쩍 뛰어넘었습니다.';
let scriptTest109_4 = new Script();
scriptTest109_4.startTime = new Time(16, 18);
scriptTest109_4.endTime = new Time(24, 3);
scriptTest109_4.text = '우상혁 선수는 지난 도쿄올림픽 때와 마찬가지로 오늘도 표정에는 자신감이 넘쳤고, 경기 그 자체를 즐겼습니다.';
let scriptTest109_5 = new Script();
scriptTest109_5.startTime = new Time(24, 3);
scriptTest109_5.endTime = new Time(26, 46);
scriptTest109_5.text = '먼저 배정훈 기자입니다.';

// 110번 뉴스
let tagTest110_1 = new Tag();
tagTest110_1.name = '시각장애인';
let tagTest110_2 = new Tag();
tagTest110_2.name = '안내견';
let tagTest110_3 = new Tag();
tagTest110_3.name = '출입거부';

let scriptTest110_1 = new Script();
scriptTest110_1.startTime = new Time(8, 98);
scriptTest110_1.endTime = new Time(13, 55);
scriptTest110_1.text = '오픈마이크, 이번 주 다음 주는 장애인을 돕는 \'도우미견\' 이야기를 해보겠습니다.';
let scriptTest110_2 = new Script();
scriptTest110_2.startTime = new Time(13, 55);
scriptTest110_2.endTime = new Time(15, 47);
scriptTest110_2.text = '먼저 시각장애인 안내견입니다.';
let scriptTest110_3 = new Script();
scriptTest110_3.startTime = new Time(16, 11);
scriptTest110_3.endTime = new Time(25, 98);
scriptTest110_3.text = '흰 지팡이는 이렇게 짚고 다녀야 한다면, 안내견은 \'엘리베이터 찾아줘\' 이렇게 뭘 찾아달라 하면 그게 어디 있는지 대신 보고, 길을 안내해 줍니다.';
let scriptTest110_4 = new Script();
scriptTest110_4.startTime = new Time(25, 98);
scriptTest110_4.endTime = new Time(29, 33);
scriptTest110_4.text = '그야말로 시각장애인의 \'눈\'이 돼주는 존재들이죠.';
let scriptTest110_5 = new Script();
scriptTest110_5.startTime = new Time(29, 33);
scriptTest110_5.endTime = new Time(37, 12);
scriptTest110_5.text = '이런 안내견들은 어디든 갈 수 있도록 법으로 보장해 놓은 지도 20년인데, 여전히 여기저기서 출입을 거부당하고 있습니다.';
let scriptTest110_6 = new Script();
scriptTest110_6.startTime = new Time(37, 12);
scriptTest110_6.endTime = new Time(39, 74);
scriptTest110_6.text = '안내견의 하루를 함께 해봤습니다.';

// 111번 뉴스
let tagTest111_1 = new Tag();
tagTest111_1.name = '프로파일러';
let tagTest111_2 = new Tag();
tagTest111_2.name = '직위해제';
let tagTest111_3 = new Tag();
tagTest111_3.name = '피의자';

let scriptTest111_1 = new Script();
scriptTest111_1.startTime = new Time(0, 0);
scriptTest111_1.endTime = new Time(7, 33);
scriptTest111_1.text = '민간 학술 단체에서 활동하며 허가 없이 돈을 번 정황이 드러난 프로파일러가 형사 입건됐습니다.';
let scriptTest111_2 = new Script();
scriptTest111_2.startTime = new Time(7, 33);
scriptTest111_2.endTime = new Time(20, 72);
scriptTest111_2.text = '전북경찰청은 과학수사대 소속 프로파일러 A 경위의 비위 행위를 감찰한 결과 자격기본법 위반 혐의가 분명하다고 보고, A 경위를 직위해제하고 피의자 신분으로 전환해 정식 수사를 시작했습니다.';
let scriptTest111_3 = new Script();
scriptTest111_3.startTime = new Time(20, 72);
scriptTest111_3.endTime = new Time(33, 7);
scriptTest111_3.text = '법 최면 수사 전문가로 알려진 A 경위는 2013년부터 \'임상 최면사\' 자격증 발급을 빌미로 돈을 받고 여성 제자들을 상대로 성범죄를 저질렀다는 의혹도 제기된 상탭니다.';
let scriptTest111_4 = new Script();
scriptTest111_4.startTime = new Time(33, 7);
scriptTest111_4.endTime = new Time(37, 84);
scriptTest111_4.text = 'A 경위는 혐의를 일부 부인하는 입장인 것으로 알려졌습니다.';

// 112번 뉴스
let tagTest112_1 = new Tag();
tagTest112_1.name = '여권';
let tagTest112_2 = new Tag();
tagTest112_2.name = '국제순위';
let tagTest112_3 = new Tag();
tagTest112_3.name = '싱가포르';

let scriptTest112_1 = new Script();
scriptTest112_1.startTime = new Time(0, 0);
scriptTest112_1.endTime = new Time(12, 55);
scriptTest112_1.text = '우리나라 여권을 가지면 무비자나 도착비자 등으로 쉽게 입국할 수 있는 국가와 속령이 192곳으로 집계됐다고 영국 국제교류 전문업체 헨리앤드파트너스가 발표했습니다.';
let scriptTest112_2 = new Script();
scriptTest112_2.startTime = new Time(12, 55);
scriptTest112_2.endTime = new Time(18, 98);
scriptTest112_2.text = '해당 업체가 매긴 분기별 여권 지수 국제 순위에서 우리나라 여권은 세계 2위에 올랐습니다.';
let scriptTest112_3 = new Script();
scriptTest112_3.startTime = new Time(18, 98);
scriptTest112_3.endTime = new Time(28, 76);
scriptTest112_3.text = '1위에 오른 나라는 일본으로, 간편 입국 가능 국가나 속령이 193개였고, 싱가포르가 우리나라와 함께 여권 지수 순위 공동 2위에 올랐습니다.';
let scriptTest112_4 = new Script();
scriptTest112_4.startTime = new Time(28, 76);
scriptTest112_4.endTime = new Time(38, 95);
scriptTest112_4.text = '우리나라 여권은 해당 순위에서 2013년 13위까지 떨어진 후 2018년부터 2~3위 최상위권을 꾸준히 유지하고 있습니다';

// 113번 뉴스
let tagTest113_1 = new Tag();
tagTest113_1.name = '미국';
let tagTest113_2 = new Tag();
tagTest113_2.name = '텍사스총격사건';
let tagTest113_3 = new Tag();
tagTest113_3.name = '부실대응';

let scriptTest113_1 = new Script();
scriptTest113_1.startTime = new Time(0, 0);
scriptTest113_1.endTime = new Time(7, 70);
scriptTest113_1.text = '열아홉 명의 어린이를 비롯해서 모두 스물한 명의 생명을 앗아간 미국 텍사스 초등학교 총격 사건.';
let scriptTest113_2 = new Script();
scriptTest113_2.startTime = new Time(7, 70);
scriptTest113_2.endTime = new Time(15, 56);
scriptTest113_2.text = '당시 300명이 넘는 경찰이 현장에 출동했는데, 경찰의 대응이 완전히 실패했다는 조사 결과가 나왔습니다.';
let scriptTest113_3 = new Script();
scriptTest113_3.startTime = new Time(15, 56);
scriptTest113_3.endTime = new Time(23, 69);
scriptTest113_3.text = '경찰들의 몸에 붙이고 있던 카메라 영상이 새롭게 공개가 됐는데요, 당시 경찰의 대응이 얼마나 부실했는지 담겨있습니다.';
let scriptTest113_4 = new Script();
scriptTest113_4.startTime = new Time(23, 69);
scriptTest113_4.endTime = new Time(25, 72);
scriptTest113_4.text = '박소희 기자가 전해드리겠습니다.';

// 114번 뉴스
let tagTest114_1 = new Tag();
tagTest114_1.name = '유희열';
let tagTest114_2 = new Tag();
tagTest114_2.name = '표절논란';
let tagTest114_3 = new Tag();
tagTest114_3.name = '하차';

let scriptTest114_1 = new Script();
scriptTest114_1.startTime = new Time(0, 0);
scriptTest114_1.endTime = new Time(7, 38);
scriptTest114_1.text = '가수이자 작곡가인 유희열 씨가 13년간 자신의 이름을 걸고 진행해 온 음악 프로그램에서 하차했습니다.';
let scriptTest114_2 = new Script();
scriptTest114_2.startTime = new Time(7, 38);
scriptTest114_2.endTime = new Time(10, 34);
scriptTest114_2.text = '표절 논란이 불거진 지 약 한 달 만인데요.';
let scriptTest114_3 = new Script();
scriptTest114_3.startTime = new Time(10, 34);
scriptTest114_3.endTime = new Time(18, 85);
scriptTest114_3.text = '최근 연이어 제기되고 있는 표절 의혹들에 대해서는 동의하기 어려운 부분도 있다면서도 자신을 더 엄격히 살피겠다고 밝혔습니다.';
let scriptTest114_4 = new Script();
scriptTest114_4.startTime = new Time(18, 85);
scriptTest114_4.endTime = new Time(21, 44);
scriptTest114_4.text = '김정인 기자가 전해드립니다.';

// 115번 뉴스
let tagTest115_1 = new Tag();
tagTest115_1.name = '아베';
let tagTest115_2 = new Tag();
tagTest115_2.name = '총격범';
let tagTest115_3 = new Tag();
tagTest115_3.name = '통일교';

let scriptTest115_1 = new Script();
scriptTest115_1.startTime = new Time(0, 0);
scriptTest115_1.endTime = new Time(8, 70);
scriptTest115_1.text = '아베 전 총리를 살해한 범인이 아베가 어머니가 빠진 종교 단체랑 관련이 있어서라고 범행 동기를 밝혔죠.';
let scriptTest115_2 = new Script();
scriptTest115_2.startTime = new Time(8, 70);
scriptTest115_2.endTime = new Time(13, 48);
scriptTest115_2.text = '그런데 이 특정 종교 단체가 통일교였던 것으로 확인이 됐습니다.';
let scriptTest115_3 = new Script();
scriptTest115_3.startTime = new Time(13, 48);
scriptTest115_3.endTime = new Time(19, 89);
scriptTest115_3.text = '범행을 하기 하루 전날 범인이 통일교 건물을 향해서 시험 발사를 했던 사실도 드러났습니다.';
let scriptTest115_4 = new Script();
scriptTest115_4.startTime = new Time(19, 89);
scriptTest115_4.endTime = new Time(22, 0);
scriptTest115_4.text = '이필희 기자가 취재했습니다.';

// 116번 뉴스
let tagTest116_1 = new Tag();
tagTest116_1.name = '지방선거';
let tagTest116_2 = new Tag();
tagTest116_2.name = '최연소';
let tagTest116_3 = new Tag();
tagTest116_3.name = '청년정치인';

let scriptTest116_1 = new Script();
scriptTest116_1.startTime = new Time(0, 0);
scriptTest116_1.endTime = new Time(4, 92);
scriptTest116_1.text = '공직선거에 출마할 수 있는 연령이 만 18살로 낮아졌죠.';
let scriptTest116_2 = new Script();
scriptTest116_2.startTime = new Time(4, 92);
scriptTest116_2.endTime = new Time(11, 83);
scriptTest116_2.text = '그 첫 선거였던 이번 지방선거에서 20대 초중반은 물론 10대 후반 당선인도 나왔습니다.';
let scriptTest116_3 = new Script();
scriptTest116_3.startTime = new Time(11, 83);
scriptTest116_3.endTime = new Time(19, 5);
scriptTest116_3.text = '청년 세대의 목소리를 대변하고 정치도 바꾸고 싶다는 젊은 당선인들을 김건휘 기자가 만나봤습니다.';

// 117번 뉴스
let tagTest117_1 = new Tag();
tagTest117_1.name = '송영길';
let tagTest117_2 = new Tag();
tagTest117_2.name = '서울시장';
let tagTest117_3 = new Tag();
tagTest117_3.name = '지방선거';

let scriptTest117_1 = new Script();
scriptTest117_1.startTime = new Time(0, 0);
scriptTest117_1.endTime = new Time(5, 67);
scriptTest117_1.text = '더불어민주당의 6.1 지방선거 서울시장 후보로 송영길 전 대표가 선출됐습니다.';
let scriptTest117_2 = new Script();
scriptTest117_2.startTime = new Time(5, 67);
scriptTest117_2.endTime = new Time(16, 12);
scriptTest117_2.text = '민주당 중앙당 선거관리위원회는 송 전 대표와 김진애 전 의원을 상대로 한 국민 여론 조사 결과 송영길 전 대표가 서울시장 후보로 결정됐다고 밝혔습니다.';
let scriptTest117_3 = new Script();
scriptTest117_3.startTime = new Time(16, 12);
scriptTest117_3.endTime = new Time(23, 36);
scriptTest117_3.text = '이로써 송영길 전 대표는 이번 선거에서 국민의힘 오세훈 현 서울시장과 맞붙게 됐습니다.';

// 118번 뉴스
let tagTest118_1 = new Tag();
tagTest118_1.name = '최저임금';
let tagTest118_2 = new Tag();
tagTest118_2.name = '차등적용';
let tagTest118_3 = new Tag();
tagTest118_3.name = '갈등';

let scriptTest118_1 = new Script();
scriptTest118_1.startTime = new Time(0, 0);
scriptTest118_1.endTime = new Time(3, 24);
scriptTest118_1.text = '시간당 9천 160원.';
let scriptTest118_2 = new Script();
scriptTest118_2.startTime = new Time(3, 24);
scriptTest118_2.endTime = new Time(7, 78);
scriptTest118_2.text = '현재 모든 사업장에 적용되고 있는 최저임금입니다.';
let scriptTest118_3 = new Script();
scriptTest118_3.startTime = new Time(7, 78);
scriptTest118_3.endTime = new Time(21, 16);
scriptTest118_3.text = '새 정부 들어 처음으로 최저임금 문제를 논의할 최저임금위원회 2차 전원회의가 내일 열리는데 최저임금을 업종별로 차등 적용할지에 대한 논의가 있을지 주목됩니다.';
let scriptTest118_4 = new Script();
scriptTest118_4.startTime = new Time(21, 16);
scriptTest118_4.endTime = new Time(32, 30);
scriptTest118_4.text = '윤석열 대통령은 지난 대선에서 최저임금의 \'차등 적용 검토\'를 언급한 바 있고, 추경호 기획재정부 장관도 도입 논의가 필요하다는 입장입니다.';
let scriptTest118_5 = new Script();
scriptTest118_5.startTime = new Time(32, 30);
scriptTest118_5.endTime = new Time(35, 17);
scriptTest118_5.text = '과거 정부와는 사뭇 달라진 분위기인데요.';
let scriptTest118_6 = new Script();
scriptTest118_6.startTime = new Time(35, 17);
scriptTest118_6.endTime = new Time(38, 88);
scriptTest118_6.text = '하지만 노동계는 반대 입장을 분명히 하고 있습니다.';
let scriptTest118_7 = new Script();
scriptTest118_7.startTime = new Time(38, 88);
scriptTest118_7.endTime = new Time(47, 19);
scriptTest118_7.text = '최저임금제가 시행됐던 첫해인 1988년을 제외하면 그동안 차등 적용을 한 적이 없다고 밝히고 있습니다.';
let scriptTest118_8 = new Script();
scriptTest118_8.startTime = new Time(47, 19);
scriptTest118_8.endTime = new Time(55, 74);
scriptTest118_8.text = '민주당의 한 의원은 최저임금 차등적용의 근거가 되는 법 조항을 아예 삭제하는 법안까지 발의했습니다.';
let scriptTest118_9 = new Script();
scriptTest118_9.startTime = new Time(55, 74);
scriptTest118_9.endTime = new Time(58, 16);
scriptTest118_9.text = '홍성희 기자가 취재했습니다.';

// 119번 뉴스
let tagTest119_1 = new Tag();
tagTest119_1.name = '가상화폐';
let tagTest119_2 = new Tag();
tagTest119_2.name = '국세청';
let tagTest119_3 = new Tag();
tagTest119_3.name = '상속';

let scriptTest119_1 = new Script();
scriptTest119_1.startTime = new Time(0, 0);
scriptTest119_1.endTime = new Time(11, 31);
scriptTest119_1.text = '내년부터 가상화폐 등 가상자산을 상속·증여받는 경우, 상속개시일이나 증여일 전·후 각 한 달 동안 평균액으로 재산을 평가해서 과세합니다.';
let scriptTest119_2 = new Script();
scriptTest119_2.startTime = new Time(11, 31);
scriptTest119_2.endTime = new Time(22, 58);
scriptTest119_2.text = '국세청은 오늘 가상자산을 상속·증여할 때 재산 평가를 위한 가상자산사업자 4곳을 고시하고 내년부터 평가액 산정 방법이 변경된다고 밝혔습니다.';
let scriptTest119_3 = new Script();
scriptTest119_3.startTime = new Time(22, 58);
scriptTest119_3.endTime = new Time(28, 81);
scriptTest119_3.text = '가상자산사업자는 두나무와 빗썸코리아, 코빗과 코인원 등 4곳입니다.';
let scriptTest119_4 = new Script();
scriptTest119_4.startTime = new Time(28, 81);
scriptTest119_4.endTime = new Time(39, 92);
scriptTest119_4.text = '가상자산에 대한 소득세 과세는 2023년 이후로 연기됐지만, 이와는 별개로 가상자산을 상속·증여받는 경우엔 상속·증여세가 부과됩니다.';

// 120번 뉴스
let tagTest120_1 = new Tag();
tagTest120_1.name = '외식물가';
let tagTest120_2 = new Tag();
tagTest120_2.name = '가격공개';
let tagTest120_3 = new Tag();
tagTest120_3.name = '물가상승';

let scriptTest120_1 = new Script();
scriptTest120_1.startTime = new Time(0, 0);
scriptTest120_1.endTime = new Time(4, 10);
scriptTest120_1.text = '새우깡 한 봉지, 이제 100원 정도 비싸집니다.';
let scriptTest120_2 = new Script();
scriptTest120_2.startTime = new Time(4, 10);
scriptTest120_2.endTime = new Time(8, 23);
scriptTest120_2.text = '농심이 과자 22개 값을 평균 6% 올리기로 한 겁니다.';
let scriptTest120_3 = new Script();
scriptTest120_3.startTime = new Time(8, 23);
scriptTest120_3.endTime = new Time(14, 84);
scriptTest120_3.text = '참이슬 출고 가격도 오늘부터 올라서 식당 소주 5~6천 원 시대가 올 거란 예상이 나옵니다.';
let scriptTest120_4 = new Script();
scriptTest120_4.startTime = new Time(14, 84);
scriptTest120_4.endTime = new Time(16, 50);
scriptTest120_4.text = '이뿐만이 아닙니다.';
let scriptTest120_5 = new Script();
scriptTest120_5.startTime = new Time(16, 50);
scriptTest120_5.endTime = new Time(23, 50);
scriptTest120_5.text = '서울에서 냉면 한 그릇 사 먹으려면 평균 만 원 가까이 내야 하고, 김치찌개 값은 7,000원 정돕니다.';
let scriptTest120_6 = new Script();
scriptTest120_6.startTime = new Time(23, 50);
scriptTest120_6.endTime = new Time(29, 69);
scriptTest120_6.text = '김밥도 한 줄에 2,700원 수준, 이제 1,000원 김밥은 찾아보기 어렵습니다.';
let scriptTest120_7 = new Script();
scriptTest120_7.startTime = new Time(29, 69);
scriptTest120_7.endTime = new Time(39, 82);
scriptTest120_7.text = '이렇게 최근 계속 오르고 있는 먹을거리 물가, 특히 치솟는 외식 물가를 잡겠다는 취지로 정부가 오늘부터 매주 주요 음식 가격을 공개하기로 했습니다.';
let scriptTest120_8 = new Script();
scriptTest120_8.startTime = new Time(39, 82);
scriptTest120_8.endTime = new Time(42, 75);
scriptTest120_8.text = '고아름 기자 보시고 더 들여다보겠습니다.';

// 121번 뉴스
let tagTest121_1 = new Tag();
tagTest121_1.name = '배달비';
let tagTest121_2 = new Tag();
tagTest121_2.name = '자엽업자';
let tagTest121_3 = new Tag();
tagTest121_3.name = '경쟁';

let scriptTest121_1 = new Script();
scriptTest121_1.startTime = new Time(0, 0);
scriptTest121_1.endTime = new Time(8, 5);
scriptTest121_1.text = '날이 궂으면 음식 배달비가 만 원까지 올라가자 정부가 배달비를 공개해서 경쟁을 유도하기로 했습니다.';
let scriptTest121_2 = new Script();
scriptTest121_2.startTime = new Time(8, 5);
scriptTest121_2.endTime = new Time(17, 29);
scriptTest121_2.text = '그런데 실제로 누가 얼마나 부담하는지 들여다보면 정부가 의도한 대로 효과를 낼 수 있을지 장담하기 어렵습니다.';
let scriptTest121_3 = new Script();
scriptTest121_3.startTime = new Time(17, 29);
scriptTest121_3.endTime = new Time(19, 3);
scriptTest121_3.text = '임경아 기자입니다.';

// 122번 뉴스
let tagTest122_1 = new Tag();
tagTest122_1.name = 'NFT';
let tagTest122_2 = new Tag();
tagTest122_2.name = '디지털작품';
let tagTest122_3 = new Tag();
tagTest122_3.name = '투자';

let scriptTest122_1 = new Script();
scriptTest122_1.startTime = new Time(0, 0);
scriptTest122_1.endTime = new Time(4, 73);
scriptTest122_1.text = '거대한 괴물, 미사일이 쏟아지는 붉은 하늘.';
let scriptTest122_2 = new Script();
scriptTest122_2.startTime = new Time(4, 73);
scriptTest122_2.endTime = new Time(9, 46);
scriptTest122_2.text = '한 구석에서는 어른과 아이가 손을 잡고 몸을 피하고 있죠.';
let scriptTest122_3 = new Script();
scriptTest122_3.startTime = new Time(9, 46);
scriptTest122_3.endTime = new Time(12, 91);
scriptTest122_3.text = '침공 소식을 전하는 BBC 뉴스 화면도 보이는데요.';
let scriptTest122_4 = new Script();
scriptTest122_4.startTime = new Time(12, 91);
scriptTest122_4.endTime = new Time(18, 33);
scriptTest122_4.text = '러시아가 우크라이나를 침공한 2월 24일 새벽 5시 45분.';
let scriptTest122_5 = new Script();
scriptTest122_5.startTime = new Time(18, 33);
scriptTest122_5.endTime = new Time(20, 74);
scriptTest122_5.text = '그 순간을 보여주는 작품입니다.';
let scriptTest122_6 = new Script();
scriptTest122_6.startTime = new Time(20, 74);
scriptTest122_6.endTime = new Time(26, 39);
scriptTest122_6.text = '이 작품은 우크라이나 정부가 기부금을 모으려고 만든 디지털 예술 작품인데요.';
let scriptTest122_7 = new Script();
scriptTest122_7.startTime = new Time(26, 39);
scriptTest122_7.endTime = new Time(34, 68);
scriptTest122_7.text = '가짜가 아니라 진품이라는 걸 증명하기 위해서 NFT, 그러니까 암호 기술로 만든 꼬리표를 붙였습니다.';
let scriptTest122_8 = new Script();
scriptTest122_8.startTime = new Time(34, 68);
scriptTest122_8.endTime = new Time(43, 58);
scriptTest122_8.text = '이 작품은 60만 원에 팔렸는데 우크라이나 정부는 하루 만에 54종류의 디지털 작품을 팔아서 7억 원이나 모았습니다.';
let scriptTest122_9 = new Script();
scriptTest122_9.startTime = new Time(43, 58);
scriptTest122_9.endTime = new Time(47, 79);
scriptTest122_9.text = '우크라이나를 도우려는 전 세계 사람들이 이 작품을 사준 건데요.';
let scriptTest122_10 = new Script();
scriptTest122_10.startTime = new Time(47, 79);
scriptTest122_10.endTime = new Time(55, 23);
scriptTest122_10.text = '지불은 암호화폐, 이더리움으로 하고 우크라이나 정부가 개설한 암호화폐 지갑으로 입금이 되는 겁니다.';
let scriptTest122_11 = new Script();
scriptTest122_11.startTime = new Time(55, 23);
scriptTest122_11.endTime = new Time(58, 28);
scriptTest122_11.text = '하지만 가짜도 돌아다닙니다.';
let scriptTest122_12 = new Script();
scriptTest122_12.startTime = new Time(58, 28);
scriptTest122_12.endTime = new Time(64, 76);
scriptTest122_12.text = '디지털 작품을 복제해서 우크라이나 정부를 사칭한 가짜 NFT 꼬리표를 붙여서 파는 건데요.';
let scriptTest122_13 = new Script();
scriptTest122_13.startTime = new Time(64, 76);
scriptTest122_13.endTime = new Time(70, 6);
scriptTest122_13.text = '우크라이나 정부는 공식 사이트에서만 구매할 수 있다 이렇게 당부까지 했습니다.';
let scriptTest122_14 = new Script();
scriptTest122_14.startTime = new Time(70, 6);
scriptTest122_14.endTime = new Time(76, 1);
scriptTest122_14.text = '그러니까 NFT가 붙어 있다고 해서 다 믿을 수 있는 건 아니라는 뜻입니다.';
let scriptTest122_15 = new Script();
scriptTest122_15.startTime = new Time(76, 1);
scriptTest122_15.endTime = new Time(83, 41);
scriptTest122_15.text = '폭발적으로 성장하고 있는 NFT의 세계, 큰돈이 몰려들고 있지만 위험도 도사리고 있습니다.';
let scriptTest122_16 = new Script();
scriptTest122_16.startTime = new Time(83, 41);
scriptTest122_16.endTime = new Time(86, 4);
scriptTest122_16.text = '김아영 기자가 전해드리겠습니다.';

// 123번 뉴스
let tagTest123_1 = new Tag();
tagTest123_1.name = '엔디비아';
let tagTest123_2 = new Tag();
tagTest123_2.name = 'ARM';
let tagTest123_3 = new Tag();
tagTest123_3.name = '인수';

let scriptTest123_1 = new Script();
scriptTest123_1.startTime = new Time(0, 0);
scriptTest123_1.endTime = new Time(5, 76);
scriptTest123_1.text = '화웨이 거래 중단만큼이나 우리 반도체 업체가 촉각을 곤두세우는 소식이 또 있습니다.';
let scriptTest123_2 = new Script();
scriptTest123_2.startTime = new Time(5, 76);
scriptTest123_2.endTime = new Time(9, 69);
scriptTest123_2.text = '반도체 업계의 사상 최대 규모의 인수합병인데요.';
let scriptTest123_3 = new Script();
scriptTest123_3.startTime = new Time(9, 69);
scriptTest123_3.endTime = new Time(19, 22);
scriptTest123_3.text = '그래픽 칩 세계 1위 회사인 엔비디아가 반도체를 설계하는 1위 회사인 ARM이라는 회사를 47조 원에 인수하기로 한 겁니다.';
let scriptTest123_4 = new Script();
scriptTest123_4.startTime = new Time(19, 22);
scriptTest123_4.endTime = new Time(30, 95);
scriptTest123_4.text = '이 ARM이라는 회사는 반도체 설계도를 만들어서 삼성, 애플 같은 기업에 파는데 스마트폰에 들어가는 반도체의 95%가 이 회사 설계를 바탕으로 하고 있습니다.';
let scriptTest123_5 = new Script();
scriptTest123_5.startTime = new Time(30, 95);
scriptTest123_5.endTime = new Time(38, 21);
scriptTest123_5.text = '문제는 이런 ARM을 인수한 곳이 삼성전자처럼 칩을 만드는 경쟁 회사라는 점입니다.';
let scriptTest123_6 = new Script();
scriptTest123_6.startTime = new Time(38, 21);
scriptTest123_6.endTime = new Time(43, 33);
scriptTest123_6.text = '앞으로 불리한 일이 생길 수 있다는 걱정이 나오는데요, 이성훈 기자가 전해드립니다.';

// 124번 뉴스
let tagTest124_1 = new Tag();
tagTest124_1.name = '토스';
let tagTest124_2 = new Tag();
tagTest124_2.name = '간편결제';
let tagTest124_3 = new Tag();
tagTest124_3.name = '피해';

let scriptTest124_1 = new Script();
scriptTest124_1.startTime = new Time(0, 0);
scriptTest124_1.endTime = new Time(6, 2);
scriptTest124_1.text = '온라인 금융서비스 토스에서 본인도 모르게 결제가 이루어지는 사고가 발생했습니다.';
let scriptTest124_2 = new Script();
scriptTest124_2.startTime = new Time(6, 2);
scriptTest124_2.endTime = new Time(16, 74);
scriptTest124_2.text = '토스에 따르면 지난 6월 3일 토스 간편 결제 서비스를 이용하는 고객 8명이 일부 온라인 사이트에서 자신도 모르게 900여만 원이 결제되는 피해를 입었습니다.';
let scriptTest124_3 = new Script();
scriptTest124_3.startTime = new Time(16, 74);
scriptTest124_3.endTime = new Time(31, 69);
scriptTest124_3.text = '토스 측은 토스 시스템을 해킹한 것이 아니라 피해 고객의 개인정보를 도용해 결제를 시도한 것으로 파악하고 있다면서 피해 계정을 즉시 차단하고 본인 인증을 한 차례 더 거치는 방식으로 결제 방식을 변경했다고 밝혔습니다.';

// 125번 뉴스
let tagTest125_1 = new Tag();
tagTest125_1.name = '카드번호';
let tagTest125_2 = new Tag();
tagTest125_2.name = '보안코드';
let tagTest125_3 = new Tag();
tagTest125_3.name = '금융';

let scriptTest125_1 = new Script();
scriptTest125_1.startTime = new Time(0, 0);
scriptTest125_1.endTime = new Time(7, 44);
scriptTest125_1.text = '보통 신용카드 앞면에는 카드 번호가, 뒷면에는 \'CVV, CVC\'라고 하는 보안 코드가 있죠.';
let scriptTest125_2 = new Script();
scriptTest125_2.startTime = new Time(7, 44);
scriptTest125_2.endTime = new Time(11, 14);
scriptTest125_2.text = '이러한 정보들이 빠진 카드가 속속 등장하고 있습니다.';
let scriptTest125_3 = new Script();
scriptTest125_3.startTime = new Time(12, 32);
scriptTest125_3.endTime = new Time(16, 54);
scriptTest125_3.text = '최근 출범한 인터넷전문은행, \'토스뱅크\'의 체크카든데요.';
let scriptTest125_4 = new Script();
scriptTest125_4.startTime = new Time(16, 54);
scriptTest125_4.endTime = new Time(21, 54);
scriptTest125_4.text = '기존 카드와는 다르게 카드 번호와 보안 코드 없이 유효기간만 표시돼 있습니다.';
let scriptTest125_5 = new Script();
scriptTest125_5.startTime = new Time(21, 54);
scriptTest125_5.endTime = new Time(24, 69);
scriptTest125_5.text = '대신 모바일 앱에서 정보를 확인하는 방식인데요.';
let scriptTest125_6 = new Script();
scriptTest125_6.startTime = new Time(24, 69);
scriptTest125_6.endTime = new Time(33, 8);
scriptTest125_6.text = '앞서 하나카드도 실물 카드에 카드 번호와 CVV 표기 여부를 고객이 직접 선택할 수 있는 옵션을 도입하기도 했습니다.';
let scriptTest125_7 = new Script();
scriptTest125_7.startTime = new Time(33, 8);
scriptTest125_7.endTime = new Time(41, 39);
scriptTest125_7.text = '이는 금융위원회가 소비자 선택에 따라 실물 카드에 카드 번호와 보안 코드를 생략할 수 있도록 제도를 개선한 데 따른 건데요.';
let scriptTest125_8 = new Script();
scriptTest125_8.startTime = new Time(41, 39);
scriptTest125_8.endTime = new Time(47, 28);
scriptTest125_8.text = '분실된 카드의 카드 정보를 이용해서 온라인 결제를 하는 부정 사용 피해를 줄이려는 조치입니다.';
let scriptTest125_9 = new Script();
scriptTest125_9.startTime = new Time(47, 28);
scriptTest125_9.endTime = new Time(60, 17);
scriptTest125_9.text = '하지만 카드 번호나 보안 코드를 요구하는 일부 해외 매장에서는 이런 카드를 사용하는 게 불편할 수 있고, 금융 앱을 잘 활용하지 못하는 사람은 쓰기가 어려울 거라는 우려도 있습니다.';

//126번 뉴스
let tagTest126_1 = new Tag();
tagTest126_1.name = '헤어질결심';
let tagTest126_2 = new Tag();
tagTest126_2.name = '박찬욱';
let tagTest126_3 = new Tag();
tagTest126_3.name = '영화';
let scriptTest126_1 = new Script();
scriptTest126_1.startTime = new Time(0, 0);
scriptTest126_1.endTime = new Time(2, 69);
scriptTest126_1.text = '문화 연예 플러스입니다.';
let scriptTest126_2 = new Script();
scriptTest126_2.startTime = new Time(2, 69);
scriptTest126_2.endTime = new Time(9, 74);
scriptTest126_2.text = '칸 국제영화제 감독상을 받은 박찬욱 감독의 영화 헤어질 결심이 촬영 현장 사진을 대거 공개했는데요.';
let scriptTest126_3 = new Script();
scriptTest126_3.startTime = new Time(9, 74);
scriptTest126_3.endTime = new Time(16, 85);
scriptTest126_3.text = '주연을 맡은 박해일과 탕웨이뿐만 아니라 이정현과 박정민, 김신영 등 친근한 얼굴들이 눈에 띕니다.';
let scriptTest126_4 = new Script();
scriptTest126_4.startTime = new Time(16, 85);
scriptTest126_4.endTime = new Time(24, 44);
scriptTest126_4.text = '박감독은 특히 코미디언 김신영에 대한 애정을 드러냈는데요.';
let scriptTest126_5 = new Script();
scriptTest126_5.startTime = new Time(24, 44);
scriptTest126_5.endTime = new Time(30, 75);
scriptTest126_5.text = '행님아 때부터 팬이었고 코미디를 잘하는 사람은 다른 연기도 잘한다는 확신을 갖고 캐스팅했다고 말했습니다.';
let scriptTest126_6 = new Script();
scriptTest126_6.startTime = new Time(30, 75);
scriptTest126_6.endTime = new Time(35, 81);
scriptTest126_6.text = '또 그 이상으로 잘해줘 보배라 생각한다며 칭찬을 아끼지 않았는데요.';
let scriptTest126_7 = new Script();
scriptTest126_7.startTime = new Time(35, 81);
scriptTest126_7.endTime = new Time(43, 24);
scriptTest126_7.text = '주인공 박해일의 아내를 연기한 이정현과 용의자를 맡은 박정민 사진도 공개돼 영화에 대한 궁금증을 자아냈습니다.';
let scriptTest126_8 = new Script();
scriptTest126_8.startTime = new Time(43, 24);
scriptTest126_8.endTime = new Time(46, 98);
scriptTest126_8.text = '수사 멜로극 헤어질 결심은 다음 주 수요일 개봉합니다.';
// 127번 뉴스
let tagTest127_1 = new Tag();
tagTest127_1.name = '이준석';
let tagTest127_2 = new Tag();
tagTest127_2.name = '박지현';
let tagTest127_3 = new Tag();
tagTest127_3.name = '청년대표';
let scriptTest127_1 = new Script();
scriptTest127_1.startTime = new Time(0, 0);
scriptTest127_1.endTime = new Time(7, 76);
scriptTest127_1.text = '얼마 전까지만 해도 청년 정치의 상징이던 여야 대표들이 나란히 어려움에 처해있습니다.';
let scriptTest127_2 = new Script();
scriptTest127_2.startTime = new Time(7, 76);
scriptTest127_2.endTime = new Time(19, 24);
scriptTest127_2.text = '오늘부로 당원권 정지가 확정된 국민의힘 이준석 대표는 장외 정치 중이고, 민주당 박지현 전 비대위원장은 당 대표 출마 서류 접수조차 거부당했습니다.';
let scriptTest127_3 = new Script();
scriptTest127_3.startTime = new Time(19, 24);
scriptTest127_3.endTime = new Time(21, 69);
scriptTest127_3.text = '강청완 기자의 보도입니다.';
// 128번 뉴스
let tagTest128_1 = new Tag();
tagTest128_1.name = '코로나19';
let tagTest128_2 = new Tag();
tagTest128_2.name = '수학여행';
let tagTest128_3 = new Tag();
tagTest128_3.name = '159명확진';
let scriptTest128_1 = new Script();
scriptTest128_1.startTime = new Time(0, 0);
scriptTest128_1.endTime = new Time(2, 57);
scriptTest128_1.text = '다음은 코로나 소식으로 이어가겠습니다.';
let scriptTest128_2 = new Script();
scriptTest128_2.startTime = new Time(2, 57);
scriptTest128_2.endTime = new Time(6, 97);
scriptTest128_2.text = '추가 확진자는 이틀 연속 7만 명대를 기록했습니다.';
let scriptTest128_3 = new Script();
scriptTest128_3.startTime = new Time(6, 97);
scriptTest128_3.endTime = new Time(14, 63);
scriptTest128_3.text = '확진자들의 나이대를 분석해보면, 최근 들어서 20대가 가장 많고 그다음이 10대가 많았습니다.';
let scriptTest128_4 = new Script();
scriptTest128_4.startTime = new Time(14, 63);
scriptTest128_4.endTime = new Time(24, 40);
scriptTest128_4.text = '특히 10대 청소년들 사이에서 환자가 빠르게 늘고 있는데, 수학여행을 다녀온 한 고등학교에서 100명 넘는 확진자가 나왔습니다.';
let scriptTest128_5 = new Script();
scriptTest128_5.startTime = new Time(24, 40);
scriptTest128_5.endTime = new Time(26, 32);
scriptTest128_5.text = '유덕기 기자입니다.';
// 129번 뉴스
let tagTest129_1 = new Tag();
tagTest129_1.name = '콜롬비아';
let tagTest129_2 = new Tag();
tagTest129_2.name = '마약';
let tagTest129_3 = new Tag();
tagTest129_3.name = '마리화나';
let scriptTest129_1 = new Script();
scriptTest129_1.startTime = new Time(0, 0);
scriptTest129_1.endTime = new Time(13, 22);
scriptTest129_1.text = 'SNS를 통해 오늘 하루 관심사와 솔직한 반응을 알아보는 오클릭 시간입니다.';
let scriptTest129_2 = new Script();
scriptTest129_2.startTime = new Time(13, 22);
scriptTest129_2.endTime = new Time(19, 12);
scriptTest129_2.text = '콜롬비아의 한 마을에서 주민 수백 명이 집단으로 마약에 취하는 사건이 벌어졌습니다.';
let scriptTest129_3 = new Script();
scriptTest129_3.startTime = new Time(19, 12);
scriptTest129_3.endTime = new Time(23, 14);
scriptTest129_3.text = '오클릭 첫 번째 검색어는 마리화나 연기 테러입니다.';
let scriptTest129_4 = new Script();
scriptTest129_4.startTime = new Time(23, 14);
scriptTest129_4.endTime = new Time(29, 14);
scriptTest129_4.text = '콜롬비아의 한 마을 외곽에서 하얀 연기가 솟구칩니다.';
let scriptTest129_5 = new Script();
scriptTest129_5.startTime = new Time(29, 14);
scriptTest129_5.endTime = new Time(37, 69);
scriptTest129_5.text = '이상한 냄새를 풍기는 연기가 계속해서 피어오르는 걸 보고 주민들은 긴급 대피했는데 연기는 단순한 화재 때문이 아니었습니다.';
let scriptTest129_6 = new Script();
scriptTest129_6.startTime = new Time(37, 69);
scriptTest129_6.endTime = new Time(48, 88);
scriptTest129_6.text = '콜롬비아 경찰이 인근에서 트럭에 실어 운반하던 마리화나 1.6톤을 압류했는데 압류한 마리화나를 전량 소각하기 위해 장소를 물색하다 군부대를 선택한 겁니다.';
let scriptTest129_7 = new Script();
scriptTest129_7.startTime = new Time(48, 88);
scriptTest129_7.endTime = new Time(54, 51);
scriptTest129_7.text = '하지만 부대와 마을은 예상보다 가까웠고 연기는 순식간에 마을을 덮쳤습니다.';
let scriptTest129_8 = new Script();
scriptTest129_8.startTime = new Time(54, 51);
scriptTest129_8.endTime = new Time(60, 26);
scriptTest129_8.text = '주민들은 특유의 냄새와 환각 효과 때문에 두통과 어지럼증 등 고통을 호소했는데요.';
let scriptTest129_9 = new Script();
scriptTest129_9.startTime = new Time(60, 26);
scriptTest129_9.endTime = new Time(70, 52);
scriptTest129_9.text = '그러면서 압류한 마리화나를 소각하는 건 당연하지만 왜 하필이면 민가와 가까운 곳이냐, 결정을 내린 사람을 찾아 책임을 물어야 한다고 항의했습니다.';
let scriptTest129_10 = new Script();
scriptTest129_10.startTime = new Time(70, 52);
scriptTest129_10.endTime = new Time(75, 34);
scriptTest129_10.text = '누리꾼들은 말 그대로 테러네요. 경찰이 뭐 이렇게 허술하죠?';
let scriptTest129_11 = new Script();
scriptTest129_11.startTime = new Time(75, 34);
scriptTest129_11.endTime = new Time(81, 36);
scriptTest129_11.text = '어렵게 압류해서 주민에게 마시게 한 셈이라니 황당하다라는 반응을 보였습니다.';

// 130번 뉴스
let tagTest130_1 = new Tag();
tagTest130_1.name = '2030';
let tagTest130_2 = new Tag();
tagTest130_2.name = '이재명';
let tagTest130_3 = new Tag();
tagTest130_3.name = '윤석열';

let scriptTest130_1 = new Script();
scriptTest130_1.startTime = new Time(0, 0);
scriptTest130_1.endTime = new Time(3, 13);
scriptTest130_1.text = '시청자 여러분, 뉴스룸을 시작하겠습니다.';
let scriptTest130_2 = new Script();
scriptTest130_2.startTime = new Time(3, 13);
scriptTest130_2.endTime = new Time(9, 12);
scriptTest130_2.text = '이재명·윤석열 두 후보, 오늘도 2030 세대에게 구애하는 행보를 이어갔습니다.';
let scriptTest130_3 = new Script();
scriptTest130_3.startTime = new Time(9, 12);
scriptTest130_3.endTime = new Time(16, 61);
scriptTest130_3.text = '이재명 후보는 2030 연구원을 만났고, 윤석열 후보는 야구점퍼 입고 청년들 많은 야구장을 찾았습니다.';
let scriptTest130_4 = new Script();
scriptTest130_4.startTime = new Time(16, 61);
scriptTest130_4.endTime = new Time(25, 84);
scriptTest130_4.text = '행사 내용만 달라졌을 뿐 요즘 두 후보는 그야말로 2030에 올인하는 모습인데, 공들이는 만큼의 지지율은 나오지 않고 있습니다.';
let scriptTest130_5 = new Script();
scriptTest130_5.startTime = new Time(25, 84);
scriptTest130_5.endTime = new Time(32, 8);
scriptTest130_5.text = '그러면서 청년층의 마음을 얻었던 패자 홍준표 의원의 활동폭이 커지는 모습인데요.';
let scriptTest130_6 = new Script();
scriptTest130_6.startTime = new Time(32, 8);
scriptTest130_6.endTime = new Time(37, 82);
scriptTest130_6.text = '먼저 황예린 기자가 이재명·윤석열 두 후보의 오늘 행보부터 전해드립니다.';

// 131번 뉴스
let tagTest131_1 = new Tag();
tagTest131_1.name = '러시아';
let tagTest131_2 = new Tag();
tagTest131_2.name = '천연가스';
let tagTest131_3 = new Tag();
tagTest131_3.name = '유럽';

let scriptTest131_1 = new Script();
scriptTest131_1.startTime = new Time(0, 0);
scriptTest131_1.endTime = new Time(8, 26);
scriptTest131_1.text = '러시아의 우크라이나 침공에서 비롯된 위기가 올겨울 세계 에너지 대란으로 번질거라는 전망이 나오고 있는데요.';
let scriptTest131_2 = new Script();
scriptTest131_2.startTime = new Time(8, 26);
scriptTest131_2.endTime = new Time(14, 22);
scriptTest131_2.text = '유럽은 러시아에서 들어오는 천연가스가 끊길거라는 위기감이 커지고 있습니다.';
let scriptTest131_3 = new Script();
scriptTest131_3.startTime = new Time(14, 22);
scriptTest131_3.endTime = new Time(22, 6);
scriptTest131_3.text = '우리나라도 이런 위기를 피해가긴 어려울거라는 우려가 나오고 있는데 배주환 기자가 자세히 전해드리겠습니다.';

// 132번 뉴스
let tagTest132_1 = new Tag();
tagTest132_1.name = '미국';
let tagTest132_2 = new Tag();
tagTest132_2.name = '사이버공격';
let tagTest132_3 = new Tag();
tagTest132_3.name = '국방부';


let scriptTest132_1 = new Script();
scriptTest132_1.startTime = new Time(0, 0);
scriptTest132_1.endTime = new Time(7, 4);
scriptTest132_1.text = '남북은 내일 오전 판문점 평화의집에서 고위급회담을 열고 평양공동선언 이행안을 논의합니다.';
let scriptTest132_2 = new Script();
scriptTest132_2.startTime = new Time(7, 4);
scriptTest132_2.endTime = new Time(14, 44);
scriptTest132_2.text = '통일부에 따르면 조명균 통일부 장관과 북측 리선권 조평통 위원장을 수석대표로 하는 남북 대표단이 내일 오전 고위급 회담을 진행합니다.';
let scriptTest132_3 = new Script();
scriptTest132_3.startTime = new Time(14, 44);
scriptTest132_3.endTime = new Time(20, 6);
scriptTest132_3.text = '대표단에는 우리측 김정렬 국토교통부 2차관, 북측 김윤혁 철도성 부상과 박호영 국토환경보호성 부상 등 철도.도로 분야를 담당하는 고위 당국자가 포함됐습니다.';
let scriptTest132_4 = new Script();
scriptTest132_4.startTime = new Time(20, 6);
scriptTest132_4.endTime = new Time(32, 75);
scriptTest132_4.text = '따라서 이번 회담에서는 정부가 이달 중으로 추진 중인 북측 철도·도로공동조사 논의가 집중적으로 이뤄질 것으로 보입니다.';

// 133번 뉴스
let tagTest133_1 = new Tag();
tagTest133_1.name = '채식';
let tagTest133_2 = new Tag();
tagTest133_2.name = '급식';
let tagTest133_3 = new Tag();
tagTest133_3.name = '탄소배출';

let scriptTest133_1 = new Script();
scriptTest133_1.startTime = new Time(0, 0);
scriptTest133_1.endTime = new Time(5, 59);
scriptTest133_1.text = '탄소 배출을 줄이기 위한 채식 급식이 이달부터 서울지역 전 학교에 도입됩니다.';
let scriptTest133_2 = new Script();
scriptTest133_2.startTime = new Time(5, 59);
scriptTest133_2.endTime = new Time(15, 46);
scriptTest133_2.text = '서울시교육청은 학생들이 기후 위기에 대응해 육식 섭취를 줄이는 습관을 들이도록 매달 두 차례 그린 급식의 날을 운영한다고 밝혔습니다.';
let scriptTest133_3 = new Script();
scriptTest133_3.startTime = new Time(15, 46);
scriptTest133_3.endTime = new Time(21, 97);
scriptTest133_3.text = '시 교육청은 또 관련 교육을 기존 교육과정과 연계해 운영할 방침이라고 덧붙였습니다.';

// 134번 뉴스
let tagTest134_1 = new Tag();
tagTest134_1.name = '북한';
let tagTest134_2 = new Tag();
tagTest134_2.name = '판문점';
let tagTest134_3 = new Tag();
tagTest134_3.name = '고위급회담';

let scriptTest134_1 = new Script();
scriptTest134_1.startTime = new Time(0, 0);
scriptTest134_1.endTime = new Time(7, 42);
scriptTest134_1.text = '남북은 내일 오전 판문점 평화의집에서 고위급회담을 열고 평양공동선언 이행안을 논의합니다.';
let scriptTest134_2 = new Script();
scriptTest134_2.startTime = new Time(7, 42);
scriptTest134_2.endTime = new Time(18, 26);
scriptTest134_2.text = '통일부에 따르면 조명균 통일부 장관과 북측 리선권 조평통 위원장을 수석대표로 하는 남북 대표단이 내일 오전 고위급 회담을 진행합니다.';
let scriptTest134_3 = new Script();
scriptTest134_3.startTime = new Time(18, 26);
scriptTest134_3.endTime = new Time(30, 69);
scriptTest134_3.text = '대표단에는 우리측 김정렬 국토교통부 2차관, 북측 김윤혁 철도성 부상과 박호영 국토환경보호성 부상 등 철도.도로 분야를 담당하는 고위 당국자가 포함됐습니다.';
let scriptTest134_4 = new Script();
scriptTest134_4.startTime = new Time(30, 69);
scriptTest134_4.endTime = new Time(39, 92);
scriptTest134_4.text = '따라서 이번 회담에서는 정부가 이달 중으로 추진 중인 북측 철도·도로공동조사 논의가 집중적으로 이뤄질 것으로 보입니다.';

// 135번 뉴스
let tagTest135_1 = new Tag();
tagTest135_1.name = '미국';
let tagTest135_2 = new Tag();
tagTest135_2.name = '바이든';
let tagTest135_3 = new Tag();
tagTest135_3.name = '사우디아라비아';

let scriptTest135_1 = new Script();
scriptTest135_1.startTime = new Time(0, 0);
scriptTest135_1.endTime = new Time(7, 31);
scriptTest135_1.text = '조 바이든 미국 대통령이 현지 시간으로 15일 중동 방문 마지막 대상국인 사우디아라비아에 도착했습니다.';
let scriptTest135_2 = new Script();
scriptTest135_2.startTime = new Time(7, 31);
scriptTest135_2.endTime = new Time(18, 46);
scriptTest135_2.text = '바이든 대통령은 사우디 해변 도시 제다의 왕궁에 도착해 전용 리무진에서 내린 다음 마중 나온 무함마드 빈 살만 사우디 왕세자와 주먹으로 인사를 나눴습니다.';
let scriptTest135_3 = new Script();
scriptTest135_3.startTime = new Time(18, 46);
scriptTest135_3.endTime = new Time(23, 67);
scriptTest135_3.text = '바이든 대통령은 이어 빈 살만 왕세자 등과 확대 실무 회의를 했습니다.';
let scriptTest135_4 = new Script();
scriptTest135_4.startTime = new Time(23, 67);
scriptTest135_4.endTime = new Time(37, 23);
scriptTest135_4.text = '바이든 대통령은 이번 사우디 방문에서 러시아의 우크라이나 침공에 따른 국제 유가 급등에 대처하기 위해 아랍 국가들의 석유 증산을 요청하고 사우디 인권 문제도 거론할 걸로 알려졌습니다.';

// 136번 뉴스
let tagTest136_1 = new Tag();
tagTest136_1.name = 'MBTI';
let tagTest136_2 = new Tag();
tagTest136_2.name = '성격검사';
let tagTest136_3 = new Tag();
tagTest136_3.name = '선입견';

let scriptTest136_1 = new Script();
scriptTest136_1.startTime = new Time(0, 0);
scriptTest136_1.endTime = new Time(4, 16);
scriptTest136_1.text = '\'엠비티아이\' 검사라고, 한 번쯤 들어보셨을 겁니다.';
let scriptTest136_2 = new Script();
scriptTest136_2.startTime = new Time(4, 16);
scriptTest136_2.endTime = new Time(13, 71);
scriptTest136_2.text = '간단한 문답을 통해서 사람 성격을 열여섯 가지로 구분하는데 자신이 어떤 성향인지, 줄줄 외우고 있는 젊은이들도 많습니다.';
let scriptTest136_3 = new Script();
scriptTest136_3.startTime = new Time(13, 71);
scriptTest136_3.endTime = new Time(18, 15);
scriptTest136_3.text = '혈액형이나 별자리로 성격을 따져보던 것과는 또 다르죠.';
let scriptTest136_4 = new Script();
scriptTest136_4.startTime = new Time(18, 15);
scriptTest136_4.endTime = new Time(27, 5);
scriptTest136_4.text = '그런데 이런 구분 짓기가 재미로 알아보거나 가볍게 참고하는 데 그치는 게 아니라 실제 채용에까지 영향을 미치기도 합니다.';
let scriptTest136_5 = new Script();
scriptTest136_5.startTime = new Time(27, 5);
scriptTest136_5.endTime = new Time(32, 74);
scriptTest136_5.text = '아르바이트생을 뽑는데 이렇게 MBTI를 따지는 사례가 알려져 논란이 되기도 했습니다.';
let scriptTest136_6 = new Script();
scriptTest136_6.startTime = new Time(32, 74);
scriptTest136_6.endTime = new Time(40, 5);
scriptTest136_6.text = '다양한 성향을 이해하기보다 상대를 쉽게 단정 짓고, 또 편견을 만든다는 지적도 나옵니다.';
let scriptTest136_7 = new Script();
scriptTest136_7.startTime = new Time(40, 5);
scriptTest136_7.endTime = new Time(43, 62);
scriptTest136_7.text = '이충헌 의학 전문기자가 취재했습니다.';

// 137번 뉴스
let tagTest137_1 = new Tag();
tagTest137_1.name = '유럽';
let tagTest137_2 = new Tag();
tagTest137_2.name = '독일';
let tagTest137_3 = new Tag();
tagTest137_3.name = '소녀상';

let scriptTest137_1 = new Script();
scriptTest137_1.startTime = new Time(0, 0);
scriptTest137_1.endTime = new Time(6, 79);
scriptTest137_1.text = '독일의 한 주립대학에 일본군 위안부 피해자의 상징인 평화의 소녀상이 설치됐습니다.';
let scriptTest137_2 = new Script();
scriptTest137_2.startTime = new Time(6, 79);
scriptTest137_2.endTime = new Time(14, 19);
scriptTest137_2.text = '최근 베를린 소녀상이 어려운 상황에 처한 사실을 알게 된 독일 학생들이 자발적으로 설치를 이끌어 낸 건데요.';
let scriptTest137_3 = new Script();
scriptTest137_3.startTime = new Time(14, 19);
scriptTest137_3.endTime = new Time(19, 68);
scriptTest137_3.text = '소녀상이 영원히 자리 잡게 된 학교에 김귀수 특파원이 다녀왔습니다.';

// 138번 뉴스
let tagTest138_1 = new Tag();
tagTest138_1.name = '코로나19';
let tagTest138_2 = new Tag();
tagTest138_2.name = '스리랑카';
let tagTest138_3 = new Tag();
tagTest138_3.name = '전쟁';

let scriptTest138_1 = new Script();
scriptTest138_1.startTime = new Time(0, 0);
scriptTest138_1.endTime = new Time(5, 99);
scriptTest138_1.text = '3년째 이어지고 있는 코로나19 대유행 러시아와 우크라이나의 전쟁까지.';
let scriptTest138_2 = new Script();
scriptTest138_2.startTime = new Time(5, 99);
scriptTest138_2.endTime = new Time(11, 92);
scriptTest138_2.text = '전세계에 영향을 끼치는 이런 일들은 가난한 나라들부터 타격을 주고 있습니다.';
let scriptTest138_3 = new Script();
scriptTest138_3.startTime = new Time(11, 92);
scriptTest138_3.endTime = new Time(18, 55);
scriptTest138_3.text = '동남아의 스리랑카는 최악의 경제 위기로 전기가 끊겼고 상점들도 문을 닫았는데요.';
let scriptTest138_4 = new Script();
scriptTest138_4.startTime = new Time(18, 55);
scriptTest138_4.endTime = new Time(22, 52);
scriptTest138_4.text = '대통령의 퇴진을 요구하는 시위도 거세게 일고 있습니다.';
let scriptTest138_5 = new Script();
scriptTest138_5.startTime = new Time(22, 52);
scriptTest138_5.endTime = new Time(24, 98);
scriptTest138_5.text = '박소희 기자가 전해드리겠습니다.';

// 139번 뉴스
let tagTest139_1 = new Tag();
tagTest139_1.name = '핵전쟁';
let tagTest139_2 = new Tag();
tagTest139_2.name = '우크라이나';
let tagTest139_3 = new Tag();
tagTest139_3.name = '러시아';

let scriptTest139_1 = new Script();
scriptTest139_1.startTime = new Time(6, 84);
scriptTest139_1.endTime = new Time(10, 58);
scriptTest139_1.text = '핵사용을 대놓고 언급하는 건 북한뿐만이 아닙니다.';
let scriptTest139_2 = new Script();
scriptTest139_2.startTime = new Time(10, 58);
scriptTest139_2.endTime = new Time(16, 41);
scriptTest139_2.text = '우크라이나에서 고전하고 있는 러시아는 핵전쟁을 들먹이며 서방을 위협하고 있습니다.';
let scriptTest139_3 = new Script();
scriptTest139_3.startTime = new Time(16, 41);
scriptTest139_3.endTime = new Time(25, 71);
scriptTest139_3.text = '여기에 미국과 맞서는 중국은 핵무기 수를 빠르게 늘리고 있고 미국도 유사시에는 핵무기를 사용할 수 있다며 맞서고 있죠.';
let scriptTest139_4 = new Script();
scriptTest139_4.startTime = new Time(25, 71);
scriptTest139_4.endTime = new Time(32, 94);
scriptTest139_4.text = '냉전 이후 그동안 잊고 있던 핵전쟁이 난데 없이 실제로 일어날 수 있다는 위기감이 퍼지고 있습니다.';
let scriptTest139_5 = new Script();
scriptTest139_5.startTime = new Time(32, 94);
scriptTest139_5.endTime = new Time(36, 68);
scriptTest139_5.text = '권희진 국제 문제 전문 기자가 자세히 전해드립니다.';

// 140번 뉴스
let tagTest140_1 = new Tag();
tagTest140_1.name = '퀴어축제';
let tagTest140_2 = new Tag();
tagTest140_2.name = '성소수자';
let tagTest140_3 = new Tag();
tagTest140_3.name = '차별금지';

let scriptTest140_1 = new Script();
scriptTest140_1.startTime = new Time(0, 0);
scriptTest140_1.endTime = new Time(7, 45);
scriptTest140_1.text = '코로나19로 멈췄던 다양성 축제의 장 서울 퀴어축제가 3년 만에 다시 열렸습니다.';
let scriptTest140_2 = new Script();
scriptTest140_2.startTime = new Time(7, 45);
scriptTest140_2.endTime = new Time(12, 32);
scriptTest140_2.text = '이번 축제에는 주최 측 추산으로 10만 명이 넘는 시민들이 모였는데요.';
let scriptTest140_3 = new Script();
scriptTest140_3.startTime = new Time(12, 32);
scriptTest140_3.endTime = new Time(17, 61);
scriptTest140_3.text = '주한 미국대사 등 여러 외국 대사들도 참여해서 함께 차별 금지를 외쳤습니다.';
let scriptTest140_4 = new Script();
scriptTest140_4.startTime = new Time(17, 61);
scriptTest140_4.endTime = new Time(20, 36);
scriptTest140_4.text = '김정우 기자가 다녀왔습니다.';


export const insertNewsData = async (connection) => {
  // await createConnection().then(async (connection) => {

    // drop tables
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    console.log("queryRunner executed")
    // console.log(">>>>>>", await queryRunner.hasTable("tag"))
    // if (await queryRunner.hasTable("tag")) {
    //   await queryRunner.dropTable("tag")
    // }
    // if (await queryRunner.hasTable("news")) {
    //   await queryRunner.dropTable("news")
    // }
    // await queryRunner.createTa
    // console.log(">>>>>>>><<<<<")
    // await queryRunner.dropTable("tag");
    // await queryRunner.dropTable("news");

    //삭제 ^^
    // const newsRepository = News.getRepository();
    // newsRepository.delete({ id: 193});

    const newsRepository = await News.getRepository();
    const tagRepository = await Tag.getRepository();
    const scriptRepository = await Script.getRepository();

    await tagRepository.query(`set FOREIGN_KEY_CHECKS = 0`)
    await tagRepository.clear();

    await scriptRepository.query(`set FOREIGN_KEY_CHECKS = 0`)
    await scriptRepository.clear();

    await newsRepository.query(`set FOREIGN_KEY_CHECKS = 0`)
    await newsRepository.clear();

    await tagRepository.query(`set FOREIGN_KEY_CHECKS = 1`)
    await scriptRepository.query(`set FOREIGN_KEY_CHECKS = 1`)
    await newsRepository.query(`set FOREIGN_KEY_CHECKS = 1`)
    
    // 추천 태그 객체 생성
    let tagRecommend = tagRepository.create(tagTestRecommend);
    // tagRepository.save(tagRecommend);

    // 뉴스 별 태그 객체 생성
    let tag1_1 = tagRepository.create(tagTest1_1);
    let tag1_2 = tagRepository.create(tagTest1_2);
    let tag1_3 = tagRepository.create(tagTest1_3);

    let script1_1 = scriptRepository.create(scriptTest1_1);
    let script1_2 = scriptRepository.create(scriptTest1_2);
    let script1_3 = scriptRepository.create(scriptTest1_3);
    let script1_4 = scriptRepository.create(scriptTest1_4);
    let script1_5 = scriptRepository.create(scriptTest1_5);

    let tag2_1 = tagRepository.create(tagTest2_1);
    let tag2_2 = tagRepository.create(tagTest2_2);
    let tag2_3 = tagRepository.create(tagTest2_3);

    let script2_1 = scriptRepository.create(scriptTest2_1);
    let script2_2 = scriptRepository.create(scriptTest2_2);
    let script2_3 = scriptRepository.create(scriptTest2_3);
    let script2_4 = scriptRepository.create(scriptTest2_4);

    let tag3_1 = tagRepository.create(tagTest3_1);
    let tag3_2 = tagRepository.create(tagTest3_2);
    let tag3_3 = tagRepository.create(tagTest3_3);

    let script3_1 = scriptRepository.create(scriptTest3_1);
    let script3_2 = scriptRepository.create(scriptTest3_2);
    let script3_3 = scriptRepository.create(scriptTest3_3);
    let script3_4 = scriptRepository.create(scriptTest3_4);
    let script3_5 = scriptRepository.create(scriptTest3_5);
    let script3_6 = scriptRepository.create(scriptTest3_6);

    let tag4_1 = tagRepository.create(tagTest4_1);
    let tag4_2 = tagRepository.create(tagTest4_2);
    let tag4_3 = tagRepository.create(tagTest4_3);

    let script4_1 = scriptRepository.create(scriptTest4_1);
    let script4_2 = scriptRepository.create(scriptTest4_2);
    let script4_3 = scriptRepository.create(scriptTest4_3);
    let script4_4 = scriptRepository.create(scriptTest4_4);

    let tag5_1 = tagRepository.create(tagTest5_1);
    let tag5_2 = tagRepository.create(tagTest5_2);
    let tag5_3 = tagRepository.create(tagTest5_3);

    let script5_1 = scriptRepository.create(scriptTest5_1);
    let script5_2 = scriptRepository.create(scriptTest5_2);
    let script5_3 = scriptRepository.create(scriptTest5_3);
    let script5_4 = scriptRepository.create(scriptTest5_4);
    let script5_5 = scriptRepository.create(scriptTest5_5);

    let tag6_1 = tagRepository.create(tagTest6_1);
    let tag6_2 = tagRepository.create(tagTest6_2);
    let tag6_3 = tagRepository.create(tagTest6_3);

    let script6_1 = scriptRepository.create(scriptTest6_1);
    let script6_2 = scriptRepository.create(scriptTest6_2);
    let script6_3 = scriptRepository.create(scriptTest6_3);
    let script6_4 = scriptRepository.create(scriptTest6_4);

    let tag7_1 = tagRepository.create(tagTest7_1);
    let tag7_2 = tagRepository.create(tagTest7_2);
    let tag7_3 = tagRepository.create(tagTest7_3);

    let script7_1 = scriptRepository.create(scriptTest7_1);
    let script7_2 = scriptRepository.create(scriptTest7_2);
    let script7_3 = scriptRepository.create(scriptTest7_3);

    let tag8_1 = tagRepository.create(tagTest8_1);
    let tag8_2 = tagRepository.create(tagTest8_2);
    let tag8_3 = tagRepository.create(tagTest8_3);

    let script8_1 = scriptRepository.create(scriptTest8_1);
    let script8_2 = scriptRepository.create(scriptTest8_2);
    let script8_3 = scriptRepository.create(scriptTest8_3);
    let script8_4 = scriptRepository.create(scriptTest8_4);
    let script8_5 = scriptRepository.create(scriptTest8_5);
    let script8_6 = scriptRepository.create(scriptTest8_6);
    
    let tag9_1 = tagRepository.create(tagTest9_1);
    let tag9_2 = tagRepository.create(tagTest9_2);
    let tag9_3 = tagRepository.create(tagTest9_3);

    let script9_1 = scriptRepository.create(scriptTest9_1);
    let script9_2 = scriptRepository.create(scriptTest9_2);
    let script9_3 = scriptRepository.create(scriptTest9_3);

    let tag10_1 = tagRepository.create(tagTest10_1);
    let tag10_2 = tagRepository.create(tagTest10_2);
    let tag10_3 = tagRepository.create(tagTest10_3);

    let script10_1 = scriptRepository.create(scriptTest10_1);
    let script10_2 = scriptRepository.create(scriptTest10_2);
    let script10_3 = scriptRepository.create(scriptTest10_3);

    let tag11_1 = tagRepository.create(tagTest11_1);
    let tag11_2 = tagRepository.create(tagTest11_2);
    let tag11_3 = tagRepository.create(tagTest11_3);

    let script11_1 = scriptRepository.create(scriptTest11_1);
    let script11_2 = scriptRepository.create(scriptTest11_2);
    let script11_3 = scriptRepository.create(scriptTest11_3);
    let script11_4 = scriptRepository.create(scriptTest11_4);
    let script11_5 = scriptRepository.create(scriptTest11_5);

    let tag12_1 = tagRepository.create(tagTest12_1);
    let tag12_2 = tagRepository.create(tagTest12_2);
    let tag12_3 = tagRepository.create(tagTest12_3);

    let script12_1 = scriptRepository.create(scriptTest12_1);
    let script12_2 = scriptRepository.create(scriptTest12_2);
    let script12_3 = scriptRepository.create(scriptTest12_3);
    let script12_4 = scriptRepository.create(scriptTest12_4);
    let script12_5 = scriptRepository.create(scriptTest12_5);
    let script12_6 = scriptRepository.create(scriptTest12_6);
    let script12_7 = scriptRepository.create(scriptTest12_7);
    let script12_8 = scriptRepository.create(scriptTest12_8);

    let tag13_1 = tagRepository.create(tagTest13_1);
    let tag13_2 = tagRepository.create(tagTest13_2);
    let tag13_3 = tagRepository.create(tagTest13_3);

    let script13_1 = scriptRepository.create(scriptTest13_1);
    let script13_2 = scriptRepository.create(scriptTest13_2);
    let script13_3 = scriptRepository.create(scriptTest13_3);
    let script13_4 = scriptRepository.create(scriptTest13_4);
    let script13_5 = scriptRepository.create(scriptTest13_5);

    let tag14_1 = tagRepository.create(tagTest14_1);
    let tag14_2 = tagRepository.create(tagTest14_2);
    let tag14_3 = tagRepository.create(tagTest14_3);

    let script14_1 = scriptRepository.create(scriptTest14_1);
    let script14_2 = scriptRepository.create(scriptTest14_2);
    let script14_3 = scriptRepository.create(scriptTest14_3);
    let script14_4 = scriptRepository.create(scriptTest14_4);
    let script14_5 = scriptRepository.create(scriptTest14_5);

    let tag15_1 = tagRepository.create(tagTest15_1);
    let tag15_2 = tagRepository.create(tagTest15_2);
    let tag15_3 = tagRepository.create(tagTest15_3);

    let script15_1 = scriptRepository.create(scriptTest15_1);
    let script15_2 = scriptRepository.create(scriptTest15_2);
    let script15_3 = scriptRepository.create(scriptTest15_3);
    let script15_4 = scriptRepository.create(scriptTest15_4);
    let script15_5 = scriptRepository.create(scriptTest15_5);
    let script15_6 = scriptRepository.create(scriptTest15_6);

    let tag16_1 = tagRepository.create(tagTest16_1);
    let tag16_2 = tagRepository.create(tagTest16_2);
    let tag16_3 = tagRepository.create(tagTest16_3);

    let script16_1 = scriptRepository.create(scriptTest16_1);
    let script16_2 = scriptRepository.create(scriptTest16_2);
    let script16_3 = scriptRepository.create(scriptTest16_3);
    let script16_4 = scriptRepository.create(scriptTest16_4);

    let tag17_1 = tagRepository.create(tagTest17_1);
    let tag17_2 = tagRepository.create(tagTest17_2);
    let tag17_3 = tagRepository.create(tagTest17_3);

    let script17_1 = scriptRepository.create(scriptTest17_1);
    let script17_2 = scriptRepository.create(scriptTest17_2);
    let script17_3 = scriptRepository.create(scriptTest17_3);

    let tag18_1 = tagRepository.create(tagTest18_1);
    let tag18_2 = tagRepository.create(tagTest18_2);
    let tag18_3 = tagRepository.create(tagTest18_3);

    let script18_1 = scriptRepository.create(scriptTest18_1);
    let script18_2 = scriptRepository.create(scriptTest18_2);
    let script18_3 = scriptRepository.create(scriptTest18_3);

    let tag19_1 = tagRepository.create(tagTest19_1);
    let tag19_2 = tagRepository.create(tagTest19_2);
    let tag19_3 = tagRepository.create(tagTest19_3);

    let script19_1 = scriptRepository.create(scriptTest19_1);
    let script19_2 = scriptRepository.create(scriptTest19_2);
    let script19_3 = scriptRepository.create(scriptTest19_3);

    let tag20_1 = tagRepository.create(tagTest20_1);
    let tag20_2 = tagRepository.create(tagTest20_2);
    let tag20_3 = tagRepository.create(tagTest20_3);

    let script20_1 = scriptRepository.create(scriptTest20_1);
    let script20_2 = scriptRepository.create(scriptTest20_2);
    let script20_3 = scriptRepository.create(scriptTest20_3);
    let script20_4 = scriptRepository.create(scriptTest20_4);
    let script20_5 = scriptRepository.create(scriptTest20_5);

    let tag21_1 = tagRepository.create(tagTest21_1);
    let tag21_2 = tagRepository.create(tagTest21_2);
    let tag21_3 = tagRepository.create(tagTest21_3);

    let script21_1 = scriptRepository.create(scriptTest21_1);
    let script21_2 = scriptRepository.create(scriptTest21_2);
    let script21_3 = scriptRepository.create(scriptTest21_3);

    let tag22_1 = tagRepository.create(tagTest22_1);
    let tag22_2 = tagRepository.create(tagTest22_2);
    let tag22_3 = tagRepository.create(tagTest22_3);

    let script22_1 = scriptRepository.create(scriptTest22_1);
    let script22_2 = scriptRepository.create(scriptTest22_2);
    let script22_3 = scriptRepository.create(scriptTest22_3);
    let script22_4 = scriptRepository.create(scriptTest22_4);
    let script22_5 = scriptRepository.create(scriptTest22_5);
    let script22_6 = scriptRepository.create(scriptTest22_6);
    let script22_7 = scriptRepository.create(scriptTest22_7);
    let script22_8 = scriptRepository.create(scriptTest22_8);
    let script22_9 = scriptRepository.create(scriptTest22_9);

    let tag23_1 = tagRepository.create(tagTest23_1);
    let tag23_2 = tagRepository.create(tagTest23_2);
    let tag23_3 = tagRepository.create(tagTest23_3);

    let script23_1 = scriptRepository.create(scriptTest23_1);
    let script23_2 = scriptRepository.create(scriptTest23_2);
    let script23_3 = scriptRepository.create(scriptTest23_3);
    let script23_4 = scriptRepository.create(scriptTest23_4);
    let script23_5 = scriptRepository.create(scriptTest23_5);

    let tag24_1 = tagRepository.create(tagTest24_1);
    let tag24_2 = tagRepository.create(tagTest24_2);
    let tag24_3 = tagRepository.create(tagTest24_3);

    let script24_1 = scriptRepository.create(scriptTest24_1);
    let script24_2 = scriptRepository.create(scriptTest24_2);
    let script24_3 = scriptRepository.create(scriptTest24_3);
    let script24_4 = scriptRepository.create(scriptTest24_4);

    let tag25_1 = tagRepository.create(tagTest25_1);
    let tag25_2 = tagRepository.create(tagTest25_2);
    let tag25_3 = tagRepository.create(tagTest25_3);

    let script25_1 = scriptRepository.create(scriptTest25_1);
    let script25_2 = scriptRepository.create(scriptTest25_2);
    let script25_3 = scriptRepository.create(scriptTest25_3);

    let tag26_1 = tagRepository.create(tagTest26_1);
    let tag26_2 = tagRepository.create(tagTest26_2);
    let tag26_3 = tagRepository.create(tagTest26_3);

    let script26_1 = scriptRepository.create(scriptTest26_1);
    let script26_2 = scriptRepository.create(scriptTest26_2);
    let script26_3 = scriptRepository.create(scriptTest26_3);
    let script26_4 = scriptRepository.create(scriptTest26_4);

    let tag27_1 = tagRepository.create(tagTest27_1);
    let tag27_2 = tagRepository.create(tagTest27_2);
    let tag27_3 = tagRepository.create(tagTest27_3);

    let script27_1 = scriptRepository.create(scriptTest27_1);
    let script27_2 = scriptRepository.create(scriptTest27_2);
    let script27_3 = scriptRepository.create(scriptTest27_3);
    let script27_4 = scriptRepository.create(scriptTest27_4);

    let tag28_1 = tagRepository.create(tagTest28_1);
    let tag28_2 = tagRepository.create(tagTest28_2);
    let tag28_3 = tagRepository.create(tagTest28_3);
    
    let script28_1 = scriptRepository.create(scriptTest28_1);
    let script28_2 = scriptRepository.create(scriptTest28_2);
    let script28_3 = scriptRepository.create(scriptTest28_3);
    let script28_4 = scriptRepository.create(scriptTest28_4);
    let script28_5 = scriptRepository.create(scriptTest28_5);
    let script28_6 = scriptRepository.create(scriptTest28_6);

    let tag29_1 = tagRepository.create(tagTest29_1);
    let tag29_2 = tagRepository.create(tagTest29_2);
    let tag29_3 = tagRepository.create(tagTest29_3);

    let script29_1 = scriptRepository.create(scriptTest29_1);
    let script29_2 = scriptRepository.create(scriptTest29_2);
    let script29_3 = scriptRepository.create(scriptTest29_3);
    let script29_4 = scriptRepository.create(scriptTest29_4);
    let script29_5 = scriptRepository.create(scriptTest29_5);
    let script29_6 = scriptRepository.create(scriptTest29_6);

    let tag30_1 = tagRepository.create(tagTest30_1);
    let tag30_2 = tagRepository.create(tagTest30_2);
    let tag30_3 = tagRepository.create(tagTest30_3);

    let script30_1 = scriptRepository.create(scriptTest30_1);
    let script30_2 = scriptRepository.create(scriptTest30_2);
    let script30_3 = scriptRepository.create(scriptTest30_3);
    let script30_4 = scriptRepository.create(scriptTest30_4);

    let tag31_1 = tagRepository.create(tagTest31_1);
    let tag31_2 = tagRepository.create(tagTest31_2);
    let tag31_3 = tagRepository.create(tagTest31_3);

    let script31_1 = scriptRepository.create(scriptTest31_1);
    let script31_2 = scriptRepository.create(scriptTest31_2);
    let script31_3 = scriptRepository.create(scriptTest31_3);
    let script31_4 = scriptRepository.create(scriptTest31_4);
    let script31_5 = scriptRepository.create(scriptTest31_5);

    let tag32_1 = tagRepository.create(tagTest32_1);
    let tag32_2 = tagRepository.create(tagTest32_2);
    let tag32_3 = tagRepository.create(tagTest32_3);

    let script32_1 = scriptRepository.create(scriptTest32_1);
    let script32_2 = scriptRepository.create(scriptTest32_2);
    let script32_3 = scriptRepository.create(scriptTest32_3);

    let tag33_1 = tagRepository.create(tagTest33_1);
    let tag33_2 = tagRepository.create(tagTest33_2);
    let tag33_3 = tagRepository.create(tagTest33_3);

    let script33_1 = scriptRepository.create(scriptTest33_1);
    let script33_2 = scriptRepository.create(scriptTest33_2);
    let script33_3 = scriptRepository.create(scriptTest33_3);
    let script33_4 = scriptRepository.create(scriptTest33_4);

    let tag34_1 = tagRepository.create(tagTest34_1);
    let tag34_2 = tagRepository.create(tagTest34_2);
    let tag34_3 = tagRepository.create(tagTest34_3);

    let script34_1 = scriptRepository.create(scriptTest34_1);
    let script34_2 = scriptRepository.create(scriptTest34_2);
    let script34_3 = scriptRepository.create(scriptTest34_3);

    let tag35_1 = tagRepository.create(tagTest35_1);
    let tag35_2 = tagRepository.create(tagTest35_2);
    let tag35_3 = tagRepository.create(tagTest35_3);

    let script35_1 = scriptRepository.create(scriptTest35_1);
    let script35_2 = scriptRepository.create(scriptTest35_2);
    let script35_3 = scriptRepository.create(scriptTest35_3);
    let script35_4 = scriptRepository.create(scriptTest35_4);
    let script35_5 = scriptRepository.create(scriptTest35_5);

    let tag36_1 = tagRepository.create(tagTest36_1);
    let tag36_2 = tagRepository.create(tagTest36_2);
    let tag36_3 = tagRepository.create(tagTest36_3);
    
    let script36_1 = scriptRepository.create(scriptTest36_1);
    let script36_2 = scriptRepository.create(scriptTest36_2);
    let script36_3 = scriptRepository.create(scriptTest36_3);
    let script36_4 = scriptRepository.create(scriptTest36_4);

    let tag37_1 = tagRepository.create(tagTest37_1);
    let tag37_2 = tagRepository.create(tagTest37_2);
    let tag37_3 = tagRepository.create(tagTest37_3);

    let script37_1 = scriptRepository.create(scriptTest37_1);
    let script37_2 = scriptRepository.create(scriptTest37_2);
    let script37_3 = scriptRepository.create(scriptTest37_3);
    let script37_4 = scriptRepository.create(scriptTest37_4);
    let script37_5 = scriptRepository.create(scriptTest37_5);
    let script37_6 = scriptRepository.create(scriptTest37_6);
    let script37_7 = scriptRepository.create(scriptTest37_7);

    let tag38_1 = tagRepository.create(tagTest38_1);
    let tag38_2 = tagRepository.create(tagTest38_2);
    let tag38_3 = tagRepository.create(tagTest38_3);

    let script38_1 = scriptRepository.create(scriptTest38_1);
    let script38_2 = scriptRepository.create(scriptTest38_2);
    let script38_3 = scriptRepository.create(scriptTest38_3);
    let script38_4 = scriptRepository.create(scriptTest38_4);
    let script38_5 = scriptRepository.create(scriptTest38_5);

    let tag39_1 = tagRepository.create(tagTest39_1);
    let tag39_2 = tagRepository.create(tagTest39_2);
    let tag39_3 = tagRepository.create(tagTest39_3);

    let script39_1 = scriptRepository.create(scriptTest39_1);
    let script39_2 = scriptRepository.create(scriptTest39_2);
    let script39_3 = scriptRepository.create(scriptTest39_3);
    let script39_4 = scriptRepository.create(scriptTest39_4);

    let tag40_1 = tagRepository.create(tagTest40_1);
    let tag40_2 = tagRepository.create(tagTest40_2);
    let tag40_3 = tagRepository.create(tagTest40_3);

    let script40_1 = scriptRepository.create(scriptTest40_1);
    let script40_2 = scriptRepository.create(scriptTest40_2);
    let script40_3 = scriptRepository.create(scriptTest40_3);
    let script40_4 = scriptRepository.create(scriptTest40_4);
    let script40_5 = scriptRepository.create(scriptTest40_5);

    let tag41_1 = tagRepository.create(tagTest41_1);
    let tag41_2 = tagRepository.create(tagTest41_2);
    let tag41_3 = tagRepository.create(tagTest41_3);

    let script41_1 = scriptRepository.create(scriptTest41_1);
    let script41_2 = scriptRepository.create(scriptTest41_2);
    let script41_3 = scriptRepository.create(scriptTest41_3);
    let script41_4 = scriptRepository.create(scriptTest41_4);
    let script41_5 = scriptRepository.create(scriptTest41_5);

    let tag42_1 = tagRepository.create(tagTest42_1);
    let tag42_2 = tagRepository.create(tagTest42_2);
    let tag42_3 = tagRepository.create(tagTest42_3);

    let script42_1 = scriptRepository.create(scriptTest42_1);
    let script42_2 = scriptRepository.create(scriptTest42_2);
    let script42_3 = scriptRepository.create(scriptTest42_3);
    let script42_4 = scriptRepository.create(scriptTest42_4);
    let script42_5 = scriptRepository.create(scriptTest42_5);

    let tag43_1 = tagRepository.create(tagTest43_1);
    let tag43_2 = tagRepository.create(tagTest43_2);
    let tag43_3 = tagRepository.create(tagTest43_3);

    let script43_1 = scriptRepository.create(scriptTest43_1);
    let script43_2 = scriptRepository.create(scriptTest43_2);
    let script43_3 = scriptRepository.create(scriptTest43_3);

    let tag44_1 = tagRepository.create(tagTest44_1);
    let tag44_2 = tagRepository.create(tagTest44_2);
    let tag44_3 = tagRepository.create(tagTest44_3);

    let script44_1 = scriptRepository.create(scriptTest44_1);
    let script44_2 = scriptRepository.create(scriptTest44_2);
    let script44_3 = scriptRepository.create(scriptTest44_3);
    let script44_4 = scriptRepository.create(scriptTest44_4);

    let tag45_1 = tagRepository.create(tagTest45_1);
    let tag45_2 = tagRepository.create(tagTest45_2);
    let tag45_3 = tagRepository.create(tagTest45_3);

    let script45_1 = scriptRepository.create(scriptTest45_1);
    let script45_2 = scriptRepository.create(scriptTest45_2);
    let script45_3 = scriptRepository.create(scriptTest45_3);

    let tag46_1 = tagRepository.create(tagTest46_1);
    let tag46_2 = tagRepository.create(tagTest46_2);
    let tag46_3 = tagRepository.create(tagTest46_3);

    let script46_1 = scriptRepository.create(scriptTest46_1);
    let script46_2 = scriptRepository.create(scriptTest46_2);
    let script46_3 = scriptRepository.create(scriptTest46_3);

    let tag47_1 = tagRepository.create(tagTest47_1);
    let tag47_2 = tagRepository.create(tagTest47_2);
    let tag47_3 = tagRepository.create(tagTest47_3);

    let script47_1 = scriptRepository.create(scriptTest47_1);
    let script47_2 = scriptRepository.create(scriptTest47_2);
    let script47_3 = scriptRepository.create(scriptTest47_3);

    let tag48_1 = tagRepository.create(tagTest48_1);
    let tag48_2 = tagRepository.create(tagTest48_2);
    let tag48_3 = tagRepository.create(tagTest48_3);

    let script48_1 = scriptRepository.create(scriptTest48_1);
    let script48_2 = scriptRepository.create(scriptTest48_2);
    let script48_3 = scriptRepository.create(scriptTest48_3);
    let script48_4 = scriptRepository.create(scriptTest48_4);
    let script48_5 = scriptRepository.create(scriptTest48_5);

    let tag49_1 = tagRepository.create(tagTest49_1);
    let tag49_2 = tagRepository.create(tagTest49_2);
    let tag49_3 = tagRepository.create(tagTest49_3);

    let script49_1 = scriptRepository.create(scriptTest49_1);
    let script49_2 = scriptRepository.create(scriptTest49_2);
    let script49_3 = scriptRepository.create(scriptTest49_3);
    let script49_4 = scriptRepository.create(scriptTest49_4);
    let script49_5 = scriptRepository.create(scriptTest49_5);

    let tag50_1 = tagRepository.create(tagTest50_1);
    let tag50_2 = tagRepository.create(tagTest50_2);
    let tag50_3 = tagRepository.create(tagTest50_3);

    let script50_1 = scriptRepository.create(scriptTest50_1);
    let script50_2 = scriptRepository.create(scriptTest50_2);
    let script50_3 = scriptRepository.create(scriptTest50_3);
    let script50_4 = scriptRepository.create(scriptTest50_4);

    let tag51_1 = tagRepository.create(tagTest51_1);
    let tag51_2 = tagRepository.create(tagTest51_2);
    let tag51_3 = tagRepository.create(tagTest51_3);

    let script51_1 = scriptRepository.create(scriptTest51_1);
    let script51_2 = scriptRepository.create(scriptTest51_2);
    let script51_3 = scriptRepository.create(scriptTest51_3);
    let script51_4 = scriptRepository.create(scriptTest51_4);
    let script51_5 = scriptRepository.create(scriptTest51_5);

    let tag52_1 = tagRepository.create(tagTest52_1);
    let tag52_2 = tagRepository.create(tagTest52_2);
    let tag52_3 = tagRepository.create(tagTest52_3);

    let script52_1 = scriptRepository.create(scriptTest52_1);
    let script52_2 = scriptRepository.create(scriptTest52_2);
    let script52_3 = scriptRepository.create(scriptTest52_3);
    let script52_4 = scriptRepository.create(scriptTest52_4);
    let script52_5 = scriptRepository.create(scriptTest52_5);

    let tag53_1 = tagRepository.create(tagTest53_1);
    let tag53_2 = tagRepository.create(tagTest53_2);
    let tag53_3 = tagRepository.create(tagTest53_3);

    let script53_1 = scriptRepository.create(scriptTest53_1);
    let script53_2 = scriptRepository.create(scriptTest53_2);
    let script53_3 = scriptRepository.create(scriptTest53_3);
    let script53_4 = scriptRepository.create(scriptTest53_4);

    let tag54_1 = tagRepository.create(tagTest54_1);
    let tag54_2 = tagRepository.create(tagTest54_2);
    let tag54_3 = tagRepository.create(tagTest54_3);

    let script54_1 = scriptRepository.create(scriptTest54_1);
    let script54_2 = scriptRepository.create(scriptTest54_2);
    let script54_3 = scriptRepository.create(scriptTest54_3);
    let script54_4 = scriptRepository.create(scriptTest54_4);
    let script54_5 = scriptRepository.create(scriptTest54_5);

    let tag55_1 = tagRepository.create(tagTest55_1);
    let tag55_2 = tagRepository.create(tagTest55_2);
    let tag55_3 = tagRepository.create(tagTest55_3);

    let script55_1 = scriptRepository.create(scriptTest55_1);
    let script55_2 = scriptRepository.create(scriptTest55_2);
    let script55_3 = scriptRepository.create(scriptTest55_3);
    let script55_4 = scriptRepository.create(scriptTest55_4);
    let script55_5 = scriptRepository.create(scriptTest55_5);

    let tag56_1 = tagRepository.create(tagTest56_1);
    let tag56_2 = tagRepository.create(tagTest56_2);
    let tag56_3 = tagRepository.create(tagTest56_3);

    let script56_1 = scriptRepository.create(scriptTest56_1);
    let script56_2 = scriptRepository.create(scriptTest56_2);
    let script56_3 = scriptRepository.create(scriptTest56_3);
    let script56_4 = scriptRepository.create(scriptTest56_4);

    let tag57_1 = tagRepository.create(tagTest57_1);
    let tag57_2 = tagRepository.create(tagTest57_2);
    let tag57_3 = tagRepository.create(tagTest57_3);

    let script57_1 = scriptRepository.create(scriptTest57_1);
    let script57_2 = scriptRepository.create(scriptTest57_2);
    let script57_3 = scriptRepository.create(scriptTest57_3);

    let tag58_1 = tagRepository.create(tagTest58_1);
    let tag58_2 = tagRepository.create(tagTest58_2);
    let tag58_3 = tagRepository.create(tagTest58_3);

    let script58_1 = scriptRepository.create(scriptTest58_1);
    let script58_2 = scriptRepository.create(scriptTest58_2);
    let script58_3 = scriptRepository.create(scriptTest58_3);
    let script58_4 = scriptRepository.create(scriptTest58_4);
    
    let tag59_1 = tagRepository.create(tagTest59_1);
    let tag59_2 = tagRepository.create(tagTest59_2);
    let tag59_3 = tagRepository.create(tagTest59_3);

    let script59_1 = scriptRepository.create(scriptTest59_1);
    let script59_2 = scriptRepository.create(scriptTest59_2);
    let script59_3 = scriptRepository.create(scriptTest59_3);
    let script59_4 = scriptRepository.create(scriptTest59_4);

    let tag60_1 = tagRepository.create(tagTest60_1);
    let tag60_2 = tagRepository.create(tagTest60_2);
    let tag60_3 = tagRepository.create(tagTest60_3);

    let script60_1 = scriptRepository.create(scriptTest60_1);
    let script60_2 = scriptRepository.create(scriptTest60_2);
    let script60_3 = scriptRepository.create(scriptTest60_3);
    let script60_4 = scriptRepository.create(scriptTest60_4);

    let tag61_1 = tagRepository.create(tagTest61_1);
    let tag61_2 = tagRepository.create(tagTest61_2);
    let tag61_3 = tagRepository.create(tagTest61_3);

    let script61_1 = scriptRepository.create(scriptTest61_1);
    let script61_2 = scriptRepository.create(scriptTest61_2);
    let script61_3 = scriptRepository.create(scriptTest61_3);
    let script61_4 = scriptRepository.create(scriptTest61_4);

    let tag62_1 = tagRepository.create(tagTest62_1);
    let tag62_2 = tagRepository.create(tagTest62_2);
    let tag62_3 = tagRepository.create(tagTest62_3);

    let script62_1 = scriptRepository.create(scriptTest62_1);
    let script62_2 = scriptRepository.create(scriptTest62_2);
    let script62_3 = scriptRepository.create(scriptTest62_3);
    let script62_4 = scriptRepository.create(scriptTest62_4);

    let tag63_1 = tagRepository.create(tagTest63_1);
    let tag63_2 = tagRepository.create(tagTest63_2);
    let tag63_3 = tagRepository.create(tagTest63_3);

    let script63_1 = scriptRepository.create(scriptTest63_1);
    let script63_2 = scriptRepository.create(scriptTest63_2);
    let script63_3 = scriptRepository.create(scriptTest63_3);
    let script63_4 = scriptRepository.create(scriptTest63_4);

    let tag64_1 = tagRepository.create(tagTest64_1);
    let tag64_2 = tagRepository.create(tagTest64_2);
    let tag64_3 = tagRepository.create(tagTest64_3);

    let script64_1 = scriptRepository.create(scriptTest64_1);
    let script64_2 = scriptRepository.create(scriptTest64_2);
    let script64_3 = scriptRepository.create(scriptTest64_3);
    let script64_4 = scriptRepository.create(scriptTest64_4);
    let script64_5 = scriptRepository.create(scriptTest64_5);
    let script64_6 = scriptRepository.create(scriptTest64_6);
    let script64_7 = scriptRepository.create(scriptTest64_7);
    let script64_8 = scriptRepository.create(scriptTest64_8);
    let script64_9 = scriptRepository.create(scriptTest64_9);

    let tag65_1 = tagRepository.create(tagTest65_1);
    let tag65_2 = tagRepository.create(tagTest65_2);
    let tag65_3 = tagRepository.create(tagTest65_3);

    let script65_1 = scriptRepository.create(scriptTest65_1);
    let script65_2 = scriptRepository.create(scriptTest65_2);
    let script65_3 = scriptRepository.create(scriptTest65_3);
    let script65_4 = scriptRepository.create(scriptTest65_4);

    let tag66_1 = tagRepository.create(tagTest66_1);
    let tag66_2 = tagRepository.create(tagTest66_2);
    let tag66_3 = tagRepository.create(tagTest66_3);

    let script66_1 = scriptRepository.create(scriptTest66_1);
    let script66_2 = scriptRepository.create(scriptTest66_2);
    let script66_3 = scriptRepository.create(scriptTest66_3);
    let script66_4 = scriptRepository.create(scriptTest66_4);

    let tag67_1 = tagRepository.create(tagTest67_1);
    let tag67_2 = tagRepository.create(tagTest67_2);
    let tag67_3 = tagRepository.create(tagTest67_3);

    let script67_1 = scriptRepository.create(scriptTest67_1);
    let script67_2 = scriptRepository.create(scriptTest67_2);
    let script67_3 = scriptRepository.create(scriptTest67_3);
    let script67_4 = scriptRepository.create(scriptTest67_4);

    let tag68_1 = tagRepository.create(tagTest68_1);
    let tag68_2 = tagRepository.create(tagTest68_2);
    let tag68_3 = tagRepository.create(tagTest68_3);

    let script68_1 = scriptRepository.create(scriptTest68_1);
    let script68_2 = scriptRepository.create(scriptTest68_2);
    let script68_3 = scriptRepository.create(scriptTest68_3);

    let tag69_1 = tagRepository.create(tagTest69_1);
    let tag69_2 = tagRepository.create(tagTest69_2);
    let tag69_3 = tagRepository.create(tagTest69_3);

    let script69_1 = scriptRepository.create(scriptTest69_1);
    let script69_2 = scriptRepository.create(scriptTest69_2);
    let script69_3 = scriptRepository.create(scriptTest69_3);
    let script69_4 = scriptRepository.create(scriptTest69_4);
    let script69_5 = scriptRepository.create(scriptTest69_5);
    let script69_6 = scriptRepository.create(scriptTest69_6);

    let tag70_1 = tagRepository.create(tagTest70_1);
    let tag70_2 = tagRepository.create(tagTest70_2);
    let tag70_3 = tagRepository.create(tagTest70_3);

    let script70_1 = scriptRepository.create(scriptTest70_1);
    let script70_2 = scriptRepository.create(scriptTest70_2);
    let script70_3 = scriptRepository.create(scriptTest70_3);
    let script70_4 = scriptRepository.create(scriptTest70_4);

    let tag71_1 = tagRepository.create(tagTest71_1);
    let tag71_2 = tagRepository.create(tagTest71_2);
    let tag71_3 = tagRepository.create(tagTest71_3);

    let script71_1 = scriptRepository.create(scriptTest71_1);
    let script71_2 = scriptRepository.create(scriptTest71_2);
    let script71_3 = scriptRepository.create(scriptTest71_3);
    let script71_4 = scriptRepository.create(scriptTest71_4);

    let tag72_1 = tagRepository.create(tagTest72_1);
    let tag72_2 = tagRepository.create(tagTest72_2);
    let tag72_3 = tagRepository.create(tagTest72_3);

    let script72_1 = scriptRepository.create(scriptTest72_1);
    let script72_2 = scriptRepository.create(scriptTest72_2);
    let script72_3 = scriptRepository.create(scriptTest72_3);
    let script72_4 = scriptRepository.create(scriptTest72_4);
    let script72_5 = scriptRepository.create(scriptTest72_5);
    let script72_6 = scriptRepository.create(scriptTest72_6);

    let tag73_1 = tagRepository.create(tagTest73_1);
    let tag73_2 = tagRepository.create(tagTest73_2);
    let tag73_3 = tagRepository.create(tagTest73_3);

    let script73_1 = scriptRepository.create(scriptTest73_1);
    let script73_2 = scriptRepository.create(scriptTest73_2);
    let script73_3 = scriptRepository.create(scriptTest73_3);

    let tag74_1 = tagRepository.create(tagTest74_1);
    let tag74_2 = tagRepository.create(tagTest74_2);
    let tag74_3 = tagRepository.create(tagTest74_3);

    let script74_1 = scriptRepository.create(scriptTest74_1);
    let script74_2 = scriptRepository.create(scriptTest74_2);
    let script74_3 = scriptRepository.create(scriptTest74_3);
    let script74_4 = scriptRepository.create(scriptTest74_4);
    let script74_5 = scriptRepository.create(scriptTest74_5);
    let script74_6 = scriptRepository.create(scriptTest74_6);

    let tag75_1 = tagRepository.create(tagTest75_1);
    let tag75_2 = tagRepository.create(tagTest75_2);
    let tag75_3 = tagRepository.create(tagTest75_3);

    let script75_1 = scriptRepository.create(scriptTest75_1);
    let script75_2 = scriptRepository.create(scriptTest75_2);
    let script75_3 = scriptRepository.create(scriptTest75_3);
    let script75_4 = scriptRepository.create(scriptTest75_4);
    let script75_5 = scriptRepository.create(scriptTest75_5);

    let tag76_1 = tagRepository.create(tagTest76_1);
    let tag76_2 = tagRepository.create(tagTest76_2);
    let tag76_3 = tagRepository.create(tagTest76_3);

    let script76_1 = scriptRepository.create(scriptTest76_1);
    let script76_2 = scriptRepository.create(scriptTest76_2);
    let script76_3 = scriptRepository.create(scriptTest76_3);
    let script76_4 = scriptRepository.create(scriptTest76_4);
    let script76_5 = scriptRepository.create(scriptTest76_5);
    let script76_6 = scriptRepository.create(scriptTest76_6);

    let tag77_1 = tagRepository.create(tagTest77_1);
    let tag77_2 = tagRepository.create(tagTest77_2);
    let tag77_3 = tagRepository.create(tagTest77_3);

    let script77_1 = scriptRepository.create(scriptTest77_1);
    let script77_2 = scriptRepository.create(scriptTest77_2);
    let script77_3 = scriptRepository.create(scriptTest77_3);
    let script77_4 = scriptRepository.create(scriptTest77_4);

    let tag78_1 = tagRepository.create(tagTest78_1);
    let tag78_2 = tagRepository.create(tagTest78_2);
    let tag78_3 = tagRepository.create(tagTest78_3);
    
    let script78_1 = scriptRepository.create(scriptTest78_1);
    let script78_2 = scriptRepository.create(scriptTest78_2);
    let script78_3 = scriptRepository.create(scriptTest78_3);
    let script78_4 = scriptRepository.create(scriptTest78_4);
    let script78_5 = scriptRepository.create(scriptTest78_5);

    let tag79_1 = tagRepository.create(tagTest79_1);
    let tag79_2 = tagRepository.create(tagTest79_2);
    let tag79_3 = tagRepository.create(tagTest79_3);

    let script79_1 = scriptRepository.create(scriptTest79_1);
    let script79_2 = scriptRepository.create(scriptTest79_2);
    let script79_3 = scriptRepository.create(scriptTest79_3);

    let tag80_1 = tagRepository.create(tagTest80_1);
    let tag80_2 = tagRepository.create(tagTest80_2);
    let tag80_3 = tagRepository.create(tagTest80_3);

    let script80_1 = scriptRepository.create(scriptTest80_1);
    let script80_2 = scriptRepository.create(scriptTest80_2);
    let script80_3 = scriptRepository.create(scriptTest80_3);
    let script80_4 = scriptRepository.create(scriptTest80_4);

    let tag81_1 = tagRepository.create(tagTest81_1);
    let tag81_2 = tagRepository.create(tagTest81_2);
    let tag81_3 = tagRepository.create(tagTest81_3);

    let script81_1 = scriptRepository.create(scriptTest81_1);
    let script81_2 = scriptRepository.create(scriptTest81_2);
    let script81_3 = scriptRepository.create(scriptTest81_3);
    let script81_4 = scriptRepository.create(scriptTest81_4);

    let tag82_1 = tagRepository.create(tagTest82_1);
    let tag82_2 = tagRepository.create(tagTest82_2);
    let tag82_3 = tagRepository.create(tagTest82_3);

    let script82_1 = scriptRepository.create(scriptTest82_1);
    let script82_2 = scriptRepository.create(scriptTest82_2);
    let script82_3 = scriptRepository.create(scriptTest82_3);
    let script82_4 = scriptRepository.create(scriptTest82_4);
    let script82_5 = scriptRepository.create(scriptTest82_5);
    let script82_6 = scriptRepository.create(scriptTest82_6);

    let tag83_1 = tagRepository.create(tagTest83_1);
    let tag83_2 = tagRepository.create(tagTest83_2);
    let tag83_3 = tagRepository.create(tagTest83_3);

    let script83_1 = scriptRepository.create(scriptTest83_1);
    let script83_2 = scriptRepository.create(scriptTest83_2);
    let script83_3 = scriptRepository.create(scriptTest83_3);
    let script83_4 = scriptRepository.create(scriptTest83_4);
    let script83_5 = scriptRepository.create(scriptTest83_5);

    let tag84_1 = tagRepository.create(tagTest84_1);
    let tag84_2 = tagRepository.create(tagTest84_2);
    let tag84_3 = tagRepository.create(tagTest84_3);

    let script84_1 = scriptRepository.create(scriptTest84_1);
    let script84_2 = scriptRepository.create(scriptTest84_2);
    let script84_3 = scriptRepository.create(scriptTest84_3);
    let script84_4 = scriptRepository.create(scriptTest84_4);

    let tag85_1 = tagRepository.create(tagTest85_1);
    let tag85_2 = tagRepository.create(tagTest85_2);
    let tag85_3 = tagRepository.create(tagTest85_3);

    let script85_1 = scriptRepository.create(scriptTest85_1);
    let script85_2 = scriptRepository.create(scriptTest85_2);
    let script85_3 = scriptRepository.create(scriptTest85_3);

    let tag86_1 = tagRepository.create(tagTest86_1);
    let tag86_2 = tagRepository.create(tagTest86_2);
    let tag86_3 = tagRepository.create(tagTest86_3);
    
    let script86_1 = scriptRepository.create(scriptTest86_1);
    let script86_2 = scriptRepository.create(scriptTest86_2);
    let script86_3 = scriptRepository.create(scriptTest86_3);
    let script86_4 = scriptRepository.create(scriptTest86_4);

    let tag87_1 = tagRepository.create(tagTest87_1);
    let tag87_2 = tagRepository.create(tagTest87_2);
    let tag87_3 = tagRepository.create(tagTest87_3);

    let script87_1 = scriptRepository.create(scriptTest87_1);
    let script87_2 = scriptRepository.create(scriptTest87_2);
    let script87_3 = scriptRepository.create(scriptTest87_3);

    let tag88_1 = tagRepository.create(tagTest88_1);
    let tag88_2 = tagRepository.create(tagTest88_2);
    let tag88_3 = tagRepository.create(tagTest88_3);

    let script88_1 = scriptRepository.create(scriptTest88_1);
    let script88_2 = scriptRepository.create(scriptTest88_2);
    let script88_3 = scriptRepository.create(scriptTest88_3);

    let tag89_1 = tagRepository.create(tagTest89_1);
    let tag89_2 = tagRepository.create(tagTest89_2);
    let tag89_3 = tagRepository.create(tagTest89_3);

    let script89_1 = scriptRepository.create(scriptTest89_1);
    let script89_2 = scriptRepository.create(scriptTest89_2);
    let script89_3 = scriptRepository.create(scriptTest89_3);
    let script89_4 = scriptRepository.create(scriptTest89_4);
    let script89_5 = scriptRepository.create(scriptTest89_5);

    let tag90_1 = tagRepository.create(tagTest90_1);
    let tag90_2 = tagRepository.create(tagTest90_2);
    let tag90_3 = tagRepository.create(tagTest90_3);

    let script90_1 = scriptRepository.create(scriptTest90_1);
    let script90_2 = scriptRepository.create(scriptTest90_2);
    let script90_3 = scriptRepository.create(scriptTest90_3);

    let tag91_1 = tagRepository.create(tagTest91_1);
    let tag91_2 = tagRepository.create(tagTest91_2);
    let tag91_3 = tagRepository.create(tagTest91_3);

    let script91_1 = scriptRepository.create(scriptTest91_1);
    let script91_2 = scriptRepository.create(scriptTest91_2);
    let script91_3 = scriptRepository.create(scriptTest91_3);
    let script91_4 = scriptRepository.create(scriptTest91_4);

    let tag92_1 = tagRepository.create(tagTest92_1);
    let tag92_2 = tagRepository.create(tagTest92_2);
    let tag92_3 = tagRepository.create(tagTest92_3);

    let script92_1 = scriptRepository.create(scriptTest92_1);
    let script92_2 = scriptRepository.create(scriptTest92_2);
    let script92_3 = scriptRepository.create(scriptTest92_3);

    let tag93_1 = tagRepository.create(tagTest93_1);
    let tag93_2 = tagRepository.create(tagTest93_2);
    let tag93_3 = tagRepository.create(tagTest93_3);

    let script93_1 = scriptRepository.create(scriptTest93_1);
    let script93_2 = scriptRepository.create(scriptTest93_2);
    let script93_3 = scriptRepository.create(scriptTest93_3);

    let tag94_1 = tagRepository.create(tagTest94_1);
    let tag94_2 = tagRepository.create(tagTest94_2);
    let tag94_3 = tagRepository.create(tagTest94_3);

    let script94_1 = scriptRepository.create(scriptTest94_1);
    let script94_2 = scriptRepository.create(scriptTest94_2);
    let script94_3 = scriptRepository.create(scriptTest94_3);
    let script94_4 = scriptRepository.create(scriptTest94_4);
    let script94_5 = scriptRepository.create(scriptTest94_5);
    let script94_6 = scriptRepository.create(scriptTest94_6);
    let script94_7 = scriptRepository.create(scriptTest94_7);

    let tag95_1 = tagRepository.create(tagTest95_1);
    let tag95_2 = tagRepository.create(tagTest95_2);
    let tag95_3 = tagRepository.create(tagTest95_3);

    let script95_1 = scriptRepository.create(scriptTest95_1);
    let script95_2 = scriptRepository.create(scriptTest95_2);
    let script95_3 = scriptRepository.create(scriptTest95_3);
    let script95_4 = scriptRepository.create(scriptTest95_4);

    let tag96_1 = tagRepository.create(tagTest96_1);
    let tag96_2 = tagRepository.create(tagTest96_2);
    let tag96_3 = tagRepository.create(tagTest96_3);

    let script96_1 = scriptRepository.create(scriptTest96_1);
    let script96_2 = scriptRepository.create(scriptTest96_2);
    let script96_3 = scriptRepository.create(scriptTest96_3);
    let script96_4 = scriptRepository.create(scriptTest96_4);

    let tag97_1 = tagRepository.create(tagTest97_1);
    let tag97_2 = tagRepository.create(tagTest97_2);
    let tag97_3 = tagRepository.create(tagTest97_3);

    let script97_1 = scriptRepository.create(scriptTest97_1);
    let script97_2 = scriptRepository.create(scriptTest97_2);
    let script97_3 = scriptRepository.create(scriptTest97_3);

    let tag98_1 = tagRepository.create(tagTest98_1);
    let tag98_2 = tagRepository.create(tagTest98_2);
    let tag98_3 = tagRepository.create(tagTest98_3);

    let script98_1 = scriptRepository.create(scriptTest98_1);
    let script98_2 = scriptRepository.create(scriptTest98_2);
    let script98_3 = scriptRepository.create(scriptTest98_3);

    let tag99_1 = tagRepository.create(tagTest99_1);
    let tag99_2 = tagRepository.create(tagTest99_2);
    let tag99_3 = tagRepository.create(tagTest99_3);

    let script99_1 = scriptRepository.create(scriptTest99_1);
    let script99_2 = scriptRepository.create(scriptTest99_2);
    let script99_3 = scriptRepository.create(scriptTest99_3);
    let script99_4 = scriptRepository.create(scriptTest99_4);
    let script99_5 = scriptRepository.create(scriptTest99_5);
    let script99_6 = scriptRepository.create(scriptTest99_6);

    let tag100_1 = tagRepository.create(tagTest100_1);
    let tag100_2 = tagRepository.create(tagTest100_2);
    let tag100_3 = tagRepository.create(tagTest100_3);

    let script100_1 = scriptRepository.create(scriptTest100_1);
    let script100_2 = scriptRepository.create(scriptTest100_2);
    let script100_3 = scriptRepository.create(scriptTest100_3);
    let script100_4 = scriptRepository.create(scriptTest100_4);
    let script100_5 = scriptRepository.create(scriptTest100_4);

    let tag101_1 = tagRepository.create(tagTest101_1);
    let tag101_2 = tagRepository.create(tagTest101_2);
    let tag101_3 = tagRepository.create(tagTest101_3);

    let script101_1 = scriptRepository.create(scriptTest101_1);
    let script101_2 = scriptRepository.create(scriptTest101_2);
    let script101_3 = scriptRepository.create(scriptTest101_3);
    let script101_4 = scriptRepository.create(scriptTest101_4);
    let script101_5 = scriptRepository.create(scriptTest101_5);
    let script101_6 = scriptRepository.create(scriptTest101_6);
    let script101_7 = scriptRepository.create(scriptTest101_7);

    let tag102_1 = tagRepository.create(tagTest102_1);
    let tag102_2 = tagRepository.create(tagTest102_2);
    let tag102_3 = tagRepository.create(tagTest102_3);

    let script102_1 = scriptRepository.create(scriptTest102_1);
    let script102_2 = scriptRepository.create(scriptTest102_2);
    let script102_3 = scriptRepository.create(scriptTest102_3);
    let script102_4 = scriptRepository.create(scriptTest102_4);

    let tag103_1 = tagRepository.create(tagTest103_1);
    let tag103_2 = tagRepository.create(tagTest103_2);
    let tag103_3 = tagRepository.create(tagTest103_3);

    let script103_1 = scriptRepository.create(scriptTest103_1);
    let script103_2 = scriptRepository.create(scriptTest103_2);
    let script103_3 = scriptRepository.create(scriptTest103_3);
    let script103_4 = scriptRepository.create(scriptTest103_4);

    let tag104_1 = tagRepository.create(tagTest104_1);
    let tag104_2 = tagRepository.create(tagTest104_2);
    let tag104_3 = tagRepository.create(tagTest104_3);

    let script104_1 = scriptRepository.create(scriptTest104_1);
    let script104_2 = scriptRepository.create(scriptTest104_2);
    let script104_3 = scriptRepository.create(scriptTest104_3);
    let script104_4 = scriptRepository.create(scriptTest104_4);
    let script104_5 = scriptRepository.create(scriptTest104_5);
    let script104_6 = scriptRepository.create(scriptTest104_6);
    let script104_7 = scriptRepository.create(scriptTest104_7);
    let script104_8 = scriptRepository.create(scriptTest104_8);
    let script104_9 = scriptRepository.create(scriptTest104_9);
    let script104_10 = scriptRepository.create(scriptTest104_10);
    let script104_11 = scriptRepository.create(scriptTest104_11);
    let script104_12 = scriptRepository.create(scriptTest104_12);
    let script104_13 = scriptRepository.create(scriptTest104_13);
    let script104_14 = scriptRepository.create(scriptTest104_14);
    let script104_15 = scriptRepository.create(scriptTest104_15);
    let script104_16 = scriptRepository.create(scriptTest104_16);
    let script104_17 = scriptRepository.create(scriptTest104_17);
    let script104_18 = scriptRepository.create(scriptTest104_18);
    let script104_19 = scriptRepository.create(scriptTest104_19);
    let script104_20 = scriptRepository.create(scriptTest104_20);

    let tag105_1 = tagRepository.create(tagTest104_1);
    let tag105_2 = tagRepository.create(tagTest104_2);
    let tag105_3 = tagRepository.create(tagTest104_3);

    let script105_1 = scriptRepository.create(scriptTest105_1);
    let script105_2 = scriptRepository.create(scriptTest105_2);
    let script105_3 = scriptRepository.create(scriptTest105_3);
    let script105_4 = scriptRepository.create(scriptTest105_4);
    let script105_5 = scriptRepository.create(scriptTest105_5);
    let script105_6 = scriptRepository.create(scriptTest105_6);
    let script105_7 = scriptRepository.create(scriptTest105_7);
    let script105_8 = scriptRepository.create(scriptTest105_8);
    let script105_9 = scriptRepository.create(scriptTest105_9);
    let script105_10 = scriptRepository.create(scriptTest105_10);
    let script105_11 = scriptRepository.create(scriptTest105_11);
    let script105_12 = scriptRepository.create(scriptTest105_12);
    let script105_13 = scriptRepository.create(scriptTest105_13);
    let script105_14 = scriptRepository.create(scriptTest105_14);
    let script105_15 = scriptRepository.create(scriptTest105_15);

    let tag106_1 = tagRepository.create(tagTest106_1);
    let tag106_2 = tagRepository.create(tagTest106_2);
    let tag106_3 = tagRepository.create(tagTest106_3);

    let script106_1 = scriptRepository.create(scriptTest106_1);
    let script106_2 = scriptRepository.create(scriptTest106_2);
    let script106_3 = scriptRepository.create(scriptTest106_3);
    let script106_4 = scriptRepository.create(scriptTest106_4);
    let script106_5 = scriptRepository.create(scriptTest106_5);

    let tag107_1 = tagRepository.create(tagTest107_1);
    let tag107_2 = tagRepository.create(tagTest107_2);
    let tag107_3 = tagRepository.create(tagTest107_3);

    let script107_1 = scriptRepository.create(scriptTest107_1);
    let script107_2 = scriptRepository.create(scriptTest107_2);
    let script107_3 = scriptRepository.create(scriptTest107_3);
    let script107_4 = scriptRepository.create(scriptTest107_4);

    let tag108_1 = tagRepository.create(tagTest108_1);
    let tag108_2 = tagRepository.create(tagTest108_2);
    let tag108_3 = tagRepository.create(tagTest108_3);

    let script108_1 = scriptRepository.create(scriptTest108_1);
    let script108_2 = scriptRepository.create(scriptTest108_2);
    let script108_3 = scriptRepository.create(scriptTest108_3);

    let tag109_1 = tagRepository.create(tagTest109_1);
    let tag109_2 = tagRepository.create(tagTest109_2);
    let tag109_3 = tagRepository.create(tagTest109_3);

    let script109_1 = scriptRepository.create(scriptTest109_1);
    let script109_2 = scriptRepository.create(scriptTest109_2);
    let script109_3 = scriptRepository.create(scriptTest109_3);
    let script109_4 = scriptRepository.create(scriptTest109_4);
    let script109_5 = scriptRepository.create(scriptTest109_5);

    let tag110_1 = tagRepository.create(tagTest110_1);
    let tag110_2 = tagRepository.create(tagTest110_2);
    let tag110_3 = tagRepository.create(tagTest110_3);

    let script110_1 = scriptRepository.create(scriptTest110_1);
    let script110_2 = scriptRepository.create(scriptTest110_2);
    let script110_3 = scriptRepository.create(scriptTest110_3);
    let script110_4 = scriptRepository.create(scriptTest110_4);
    let script110_5 = scriptRepository.create(scriptTest110_5);
    let script110_6 = scriptRepository.create(scriptTest110_6);

    let tag111_1 = tagRepository.create(tagTest111_1);
    let tag111_2 = tagRepository.create(tagTest111_2);
    let tag111_3 = tagRepository.create(tagTest111_3);

    let script111_1 = scriptRepository.create(scriptTest111_1);
    let script111_2 = scriptRepository.create(scriptTest111_2);
    let script111_3 = scriptRepository.create(scriptTest111_3);
    let script111_4 = scriptRepository.create(scriptTest111_4);

    let tag112_1 = tagRepository.create(tagTest112_1);
    let tag112_2 = tagRepository.create(tagTest112_2);
    let tag112_3 = tagRepository.create(tagTest112_3);

    let script112_1 = scriptRepository.create(scriptTest112_1);
    let script112_2 = scriptRepository.create(scriptTest112_2);
    let script112_3 = scriptRepository.create(scriptTest112_3);
    let script112_4 = scriptRepository.create(scriptTest112_4);

    let tag113_1 = tagRepository.create(tagTest113_1);
    let tag113_2 = tagRepository.create(tagTest113_2);
    let tag113_3 = tagRepository.create(tagTest113_3);

    let script113_1 = scriptRepository.create(scriptTest113_1);
    let script113_2 = scriptRepository.create(scriptTest113_2);
    let script113_3 = scriptRepository.create(scriptTest113_3);
    let script113_4 = scriptRepository.create(scriptTest113_4);

    let tag114_1 = tagRepository.create(tagTest114_1);
    let tag114_2 = tagRepository.create(tagTest114_2);
    let tag114_3 = tagRepository.create(tagTest114_3);

    let script114_1 = scriptRepository.create(scriptTest114_1);
    let script114_2 = scriptRepository.create(scriptTest114_2);
    let script114_3 = scriptRepository.create(scriptTest114_3);
    let script114_4 = scriptRepository.create(scriptTest114_4);

    let tag115_1 = tagRepository.create(tagTest115_1);
    let tag115_2 = tagRepository.create(tagTest115_2);
    let tag115_3 = tagRepository.create(tagTest115_3);

    let script115_1 = scriptRepository.create(scriptTest115_1);
    let script115_2 = scriptRepository.create(scriptTest115_2);
    let script115_3 = scriptRepository.create(scriptTest115_3);
    let script115_4 = scriptRepository.create(scriptTest115_4);

    let tag116_1 = tagRepository.create(tagTest116_1);
    let tag116_2 = tagRepository.create(tagTest116_2);
    let tag116_3 = tagRepository.create(tagTest116_3);

    let script116_1 = scriptRepository.create(scriptTest116_1);
    let script116_2 = scriptRepository.create(scriptTest116_2);
    let script116_3 = scriptRepository.create(scriptTest116_3);

    let tag117_1 = tagRepository.create(tagTest117_1);
    let tag117_2 = tagRepository.create(tagTest117_2);
    let tag117_3 = tagRepository.create(tagTest117_3);

    let script117_1 = scriptRepository.create(scriptTest117_1);
    let script117_2 = scriptRepository.create(scriptTest117_2);
    let script117_3 = scriptRepository.create(scriptTest117_3);

    let tag118_1 = tagRepository.create(tagTest118_1);
    let tag118_2 = tagRepository.create(tagTest118_2);
    let tag118_3 = tagRepository.create(tagTest118_3);

    let script118_1 = scriptRepository.create(scriptTest118_1);
    let script118_2 = scriptRepository.create(scriptTest118_2);
    let script118_3 = scriptRepository.create(scriptTest118_3);
    let script118_4 = scriptRepository.create(scriptTest118_4);
    let script118_5 = scriptRepository.create(scriptTest118_5);
    let script118_6 = scriptRepository.create(scriptTest118_6);
    let script118_7 = scriptRepository.create(scriptTest118_7);
    let script118_8 = scriptRepository.create(scriptTest118_8);
    let script118_9 = scriptRepository.create(scriptTest118_9);

    let tag119_1 = tagRepository.create(tagTest119_1);
    let tag119_2 = tagRepository.create(tagTest119_2);
    let tag119_3 = tagRepository.create(tagTest119_3);

    let script119_1 = scriptRepository.create(scriptTest119_1);
    let script119_2 = scriptRepository.create(scriptTest119_2);
    let script119_3 = scriptRepository.create(scriptTest119_3);
    let script119_4 = scriptRepository.create(scriptTest119_4);

    let tag120_1 = tagRepository.create(tagTest120_1);
    let tag120_2 = tagRepository.create(tagTest120_2);
    let tag120_3 = tagRepository.create(tagTest120_3);

    let script120_1 = scriptRepository.create(scriptTest120_1);
    let script120_2 = scriptRepository.create(scriptTest120_2);
    let script120_3 = scriptRepository.create(scriptTest120_3);
    let script120_4 = scriptRepository.create(scriptTest120_4);
    let script120_5 = scriptRepository.create(scriptTest120_5);
    let script120_6 = scriptRepository.create(scriptTest120_6);
    let script120_7 = scriptRepository.create(scriptTest120_7);
    let script120_8 = scriptRepository.create(scriptTest120_8);

    let tag121_1 = tagRepository.create(tagTest121_1);
    let tag121_2 = tagRepository.create(tagTest121_2);
    let tag121_3 = tagRepository.create(tagTest121_3);

    let script121_1 = scriptRepository.create(scriptTest121_1);
    let script121_2 = scriptRepository.create(scriptTest121_2);
    let script121_3 = scriptRepository.create(scriptTest121_3);

    let tag122_1 = tagRepository.create(tagTest122_1);
    let tag122_2 = tagRepository.create(tagTest122_2);
    let tag122_3 = tagRepository.create(tagTest122_3);

    let script122_1 = scriptRepository.create(scriptTest122_1);
    let script122_2 = scriptRepository.create(scriptTest122_2);
    let script122_3 = scriptRepository.create(scriptTest122_3);
    let script122_4 = scriptRepository.create(scriptTest122_4);
    let script122_5 = scriptRepository.create(scriptTest122_5);
    let script122_6 = scriptRepository.create(scriptTest122_6);
    let script122_7 = scriptRepository.create(scriptTest122_7);
    let script122_8 = scriptRepository.create(scriptTest122_8);
    let script122_9 = scriptRepository.create(scriptTest122_9);
    let script122_10 = scriptRepository.create(scriptTest122_10);
    let script122_11 = scriptRepository.create(scriptTest122_11);
    let script122_12 = scriptRepository.create(scriptTest122_12);
    let script122_13 = scriptRepository.create(scriptTest122_13);
    let script122_14 = scriptRepository.create(scriptTest122_14);
    let script122_15 = scriptRepository.create(scriptTest122_15);
    let script122_16 = scriptRepository.create(scriptTest122_16);

    let tag123_1 = tagRepository.create(tagTest123_1);
    let tag123_2 = tagRepository.create(tagTest123_2);
    let tag123_3 = tagRepository.create(tagTest123_3);

    let script123_1 = scriptRepository.create(scriptTest123_1);
    let script123_2 = scriptRepository.create(scriptTest123_2);
    let script123_3 = scriptRepository.create(scriptTest123_3);
    let script123_4 = scriptRepository.create(scriptTest123_4);
    let script123_5 = scriptRepository.create(scriptTest123_5);
    let script123_6 = scriptRepository.create(scriptTest123_6);

    let tag124_1 = tagRepository.create(tagTest124_1);
    let tag124_2 = tagRepository.create(tagTest124_2);
    let tag124_3 = tagRepository.create(tagTest124_3);

    let script124_1 = scriptRepository.create(scriptTest124_1);
    let script124_2 = scriptRepository.create(scriptTest124_2);
    let script124_3 = scriptRepository.create(scriptTest124_3);

    let tag125_1 = tagRepository.create(tagTest125_1);
    let tag125_2 = tagRepository.create(tagTest125_2);
    let tag125_3 = tagRepository.create(tagTest125_3);

    let script125_1 = scriptRepository.create(scriptTest125_1);
    let script125_2 = scriptRepository.create(scriptTest125_2);
    let script125_3 = scriptRepository.create(scriptTest125_3);
    let script125_4 = scriptRepository.create(scriptTest125_4);
    let script125_5 = scriptRepository.create(scriptTest125_5);
    let script125_6 = scriptRepository.create(scriptTest125_6);
    let script125_7 = scriptRepository.create(scriptTest125_7);
    let script125_8 = scriptRepository.create(scriptTest125_8);
    let script125_9 = scriptRepository.create(scriptTest125_9);

    let tag126_1 = tagRepository.create(tagTest126_1);
    let tag126_2 = tagRepository.create(tagTest126_2);
    let tag126_3 = tagRepository.create(tagTest126_3);
    let script126_1 = scriptRepository.create(scriptTest126_1);
    let script126_2 = scriptRepository.create(scriptTest126_2);
    let script126_3 = scriptRepository.create(scriptTest126_3);
    let script126_4 = scriptRepository.create(scriptTest126_4);
    let script126_5 = scriptRepository.create(scriptTest126_5);
    let script126_6 = scriptRepository.create(scriptTest126_6);
    let script126_7 = scriptRepository.create(scriptTest126_7);
    let script126_8 = scriptRepository.create(scriptTest126_8);
    let tag127_1 = tagRepository.create(tagTest127_1);
    let tag127_2 = tagRepository.create(tagTest127_2);
    let tag127_3 = tagRepository.create(tagTest127_3);
    let script127_1 = scriptRepository.create(scriptTest127_1);
    let script127_2 = scriptRepository.create(scriptTest127_2);
    let script127_3 = scriptRepository.create(scriptTest127_3);
    let tag128_1 = tagRepository.create(tagTest128_1);
    let tag128_2 = tagRepository.create(tagTest128_2);
    let tag128_3 = tagRepository.create(tagTest128_3);
    let script128_1 = scriptRepository.create(scriptTest128_1);
    let script128_2 = scriptRepository.create(scriptTest128_2);
    let script128_3 = scriptRepository.create(scriptTest128_3);
    let script128_4 = scriptRepository.create(scriptTest128_4);
    let script128_5 = scriptRepository.create(scriptTest128_5);
    let tag129_1 = tagRepository.create(tagTest129_1);
    let tag129_2 = tagRepository.create(tagTest129_2);
    let tag129_3 = tagRepository.create(tagTest129_3);
    let script129_1 = scriptRepository.create(scriptTest129_1);
    let script129_2 = scriptRepository.create(scriptTest129_2);
    let script129_3 = scriptRepository.create(scriptTest129_3);
    let script129_4 = scriptRepository.create(scriptTest129_4);
    let script129_5 = scriptRepository.create(scriptTest129_5);
    let script129_6 = scriptRepository.create(scriptTest129_6);
    let script129_7 = scriptRepository.create(scriptTest129_7);
    let script129_8 = scriptRepository.create(scriptTest129_8);
    let script129_9 = scriptRepository.create(scriptTest129_9);
    let script129_10 = scriptRepository.create(scriptTest129_10);
    let script129_11 = scriptRepository.create(scriptTest129_11);

    let tag130_1 = tagRepository.create(tagTest130_1);
    let tag130_2 = tagRepository.create(tagTest130_2);
    let tag130_3 = tagRepository.create(tagTest130_3);

    let script130_1 = scriptRepository.create(scriptTest130_1);
    let script130_2 = scriptRepository.create(scriptTest130_2);
    let script130_3 = scriptRepository.create(scriptTest130_3);
    let script130_4 = scriptRepository.create(scriptTest130_4);
    let script130_5 = scriptRepository.create(scriptTest130_5);
    let script130_6 = scriptRepository.create(scriptTest130_6);

    let tag131_1 = tagRepository.create(tagTest131_1);
    let tag131_2 = tagRepository.create(tagTest131_2);
    let tag131_3 = tagRepository.create(tagTest131_3);

    let script131_1 = scriptRepository.create(scriptTest131_1);
    let script131_2 = scriptRepository.create(scriptTest131_2);
    let script131_3 = scriptRepository.create(scriptTest131_3);

    let tag132_1 = tagRepository.create(tagTest132_1);
    let tag132_2 = tagRepository.create(tagTest132_2);
    let tag132_3 = tagRepository.create(tagTest132_3);

    let script132_1 = scriptRepository.create(scriptTest132_1);
    let script132_2 = scriptRepository.create(scriptTest132_2);
    let script132_3 = scriptRepository.create(scriptTest132_3);
    let script132_4 = scriptRepository.create(scriptTest132_4);
   

    let tag133_1 = tagRepository.create(tagTest133_1);
    let tag133_2 = tagRepository.create(tagTest133_2);
    let tag133_3 = tagRepository.create(tagTest133_3);

    let script133_1 = scriptRepository.create(scriptTest133_1);
    let script133_2 = scriptRepository.create(scriptTest133_2);
    let script133_3 = scriptRepository.create(scriptTest133_3);

    let tag134_1 = tagRepository.create(tagTest134_1);
    let tag134_2 = tagRepository.create(tagTest134_2);
    let tag134_3 = tagRepository.create(tagTest134_3);

    let script134_1 = scriptRepository.create(scriptTest134_1);
    let script134_2 = scriptRepository.create(scriptTest134_2);
    let script134_3 = scriptRepository.create(scriptTest134_3);
    let script134_4 = scriptRepository.create(scriptTest134_4);

    let tag135_1 = tagRepository.create(tagTest135_1);
    let tag135_2 = tagRepository.create(tagTest135_2);
    let tag135_3 = tagRepository.create(tagTest135_3);

    let script135_1 = scriptRepository.create(scriptTest135_1);
    let script135_2 = scriptRepository.create(scriptTest135_2);
    let script135_3 = scriptRepository.create(scriptTest135_3);
    let script135_4 = scriptRepository.create(scriptTest135_4);

    let tag136_1 = tagRepository.create(tagTest136_1);
    let tag136_2 = tagRepository.create(tagTest136_2);
    let tag136_3 = tagRepository.create(tagTest136_3);

    let script136_1 = scriptRepository.create(scriptTest136_1);
    let script136_2 = scriptRepository.create(scriptTest136_2);
    let script136_3 = scriptRepository.create(scriptTest136_3);
    let script136_4 = scriptRepository.create(scriptTest136_4);
    let script136_5 = scriptRepository.create(scriptTest136_5);
    let script136_6 = scriptRepository.create(scriptTest136_6);
    let script136_7 = scriptRepository.create(scriptTest136_7);

    let tag137_1 = tagRepository.create(tagTest137_1);
    let tag137_2 = tagRepository.create(tagTest137_2);
    let tag137_3 = tagRepository.create(tagTest137_3);

    let script137_1 = scriptRepository.create(scriptTest137_1);
    let script137_2 = scriptRepository.create(scriptTest137_2);
    let script137_3 = scriptRepository.create(scriptTest137_3);
    
    let tag138_1 = tagRepository.create(tagTest138_1);
    let tag138_2 = tagRepository.create(tagTest138_2);
    let tag138_3 = tagRepository.create(tagTest138_3);

    let script138_1 = scriptRepository.create(scriptTest138_1);
    let script138_2 = scriptRepository.create(scriptTest138_2);
    let script138_3 = scriptRepository.create(scriptTest138_3);
    let script138_4 = scriptRepository.create(scriptTest138_4);
    let script138_5 = scriptRepository.create(scriptTest138_5);

    let tag139_1 = tagRepository.create(tagTest139_1);
    let tag139_2 = tagRepository.create(tagTest139_2);
    let tag139_3 = tagRepository.create(tagTest139_3);

    let script139_1 = scriptRepository.create(scriptTest139_1);
    let script139_2 = scriptRepository.create(scriptTest139_2);
    let script139_3 = scriptRepository.create(scriptTest139_3);
    let script139_4 = scriptRepository.create(scriptTest139_4);
    let script139_5 = scriptRepository.create(scriptTest139_5);

    let tag140_1 = tagRepository.create(tagTest140_1);
    let tag140_2 = tagRepository.create(tagTest140_2);
    let tag140_3 = tagRepository.create(tagTest140_3);

    let script140_1 = scriptRepository.create(scriptTest140_1);
    let script140_2 = scriptRepository.create(scriptTest140_2);
    let script140_3 = scriptRepository.create(scriptTest140_3);
    let script140_4 = scriptRepository.create(scriptTest140_4);


    const newsInfo = [
      // 1번 뉴스
      {
        title: '비트코인, 한때 1만 8천 달러 붕괴',
        category: Category.ECONOMY,
        tags: [tag1_1, tag1_2, tag1_3, tagRecommend],
        scripts: [script1_1, script1_2, script1_3, script1_4, script1_5],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'S_gtbu2VRlI',
        thumbnail: 'https://img.youtube.com/vi/S_gtbu2VRlI/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(35, 4),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-19'),
      },
      // 2번 뉴스
      {
        title: '북, 최근 임진강 상류 황강댐 수문 개방',
        category: Category.SOCIETY,
        tags: [tag2_1, tag2_2, tag2_3, tagRecommend],
        scripts: [script2_1, script2_2, script2_3, script2_4],
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: 'ee-0DeY21rU',
        thumbnail: 'https://img.youtube.com/vi/ee-0DeY21rU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(36, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-30'),
      },
      // 3번 뉴스
      {
        title: '제주, 초중고교 무상급식 예산 46억 원 증액 ',
        category: Category.SOCIETY,
        tags: [tag3_1, tag3_2, tag3_3, tagRecommend],
        scripts: [script3_1, script3_2, script3_3, script3_4, script3_5, script3_6],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: '45IAfzlB_tQ',
        thumbnail: 'https://img.youtube.com/vi/45IAfzlB_tQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(37, 80),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-06'),
      },
      // 4번 뉴스
      {
        title: '안동시 공무원, 동료 직원 흉기에 찔려 사망',
        category: Category.SOCIETY,
        tags: [tag4_1, tag4_2, tag4_3, tagRecommend],
        scripts: [script4_1, script4_2, script4_3, script4_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'sId-zbgWuZU',
        thumbnail: 'https://img.youtube.com/vi/sId-zbgWuZU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(27, 16),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-05'),
      },
      // 5번 뉴스
      {
        title: '김승희 보건복지부 장관 후보자 자진 사퇴',
        category: Category.POLITICS,
        tags: [tag5_1, tag5_2, tag5_3],
        scripts: [script5_1, script5_2, script5_3, script5_4, script5_5],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'IisQfwEp8D8',
        thumbnail: 'https://img.youtube.com/vi/IisQfwEp8D8/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(40, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-04'),
      },
      // 6번 뉴스
      {
        title: '영 총리 "중, 일국양제 약속 어겨…홍콩 포기 안 할 것"',
        category: Category.WORLD,
        tags: [tag6_1, tag6_2, tag6_3],
        scripts: [script6_1, script6_2, script6_3, script6_4],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'BXs223nIWWo',
        thumbnail: 'https://img.youtube.com/vi/BXs223nIWWo/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(38, 89),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-01'),
      },
      // 7번 뉴스
      {
        title: '김혜경 ‘의전 논란’에 “모든 것이 제 불찰…송구”',
        category: Category.POLITICS,
        tags: [tag7_1, tag7_2, tag7_3],
        scripts: [script7_1, script7_2, script7_3],        
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: '-XsbzwxjiVo',
        thumbnail: 'https://img.youtube.com/vi/-XsbzwxjiVo/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(42, 78),
        suitability: Suitability.MEDIUM,
        isEmbeddable: true,
        reportDate: new Date('2022-02-02'),
      },
      // 8번 뉴스
      {
        title: '우크라이나 재건회의 \'루가노 선언\' 채택',
        category: Category.WORLD,
        tags: [tag8_1, tag8_2, tag8_3, tagRecommend],
        scripts: [script8_1, script8_2, script8_3, script8_4, script8_5, script8_6],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: '1SRz_AE8R9E',
        thumbnail: 'https://img.youtube.com/vi/1SRz_AE8R9E/hqdefault.jpg',
        startTime: new Time(6, 0),
        endTime: new Time(56, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-06'),
      },
      // 9번 뉴스
      {
        title: '원숭이두창 치료제 504명분 이번 주 도입',
        category: Category.SOCIETY,
        tags: [tag9_1, tag9_2, tag9_3, tagRecommend],
        scripts: [script9_1, script9_2, script9_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'WtuMp5G3yNo',
        thumbnail: 'https://img.youtube.com/vi/WtuMp5G3yNo/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(29, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-05'),
      },
      // 10번 뉴스
      {
        title: 'WHO "여름철 원숭이두창 추가 확산 가능성"',
        category: Category.SOCIETY,
        tags: [tag10_1, tag10_2, tag10_3, tagRecommend],
        scripts: [script10_1, script10_2, script10_3],
        announcerGender: Gender.MEN,
        channel: Channel.MBC,
        link: 'nsTeNVwGRMQ',
        thumbnail: 'https://img.youtube.com/vi/nsTeNVwGRMQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(36, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-01'),
      },
      // 11번 뉴스
      {
        title: '"청나라 말기 같다"‥\'日 선진국 탈락\' 잇단 경고',
        category: Category.WORLD,
        tags: [tag11_1, tag11_2, tag11_3, tagRecommend],
        scripts: [script11_1, script11_2, script11_3, script11_4, script11_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'hhbs2rUII94',
        thumbnail: 'https://img.youtube.com/vi/hhbs2rUII94/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(24, 57),
        suitability: Suitability.MEDIUM,
        isEmbeddable: true,
        reportDate: new Date('2022-01-30'),
      },
      // 12번 뉴스
      {
        title: '손님들이 건넨 술 마시고 사망…함께 있던 남성은 사고사',
        category: Category.SOCIETY,
        tags: [tag12_1, tag12_2, tag12_3, tagRecommend],
        scripts: [script12_1, script12_2, script12_3, script12_4, script12_5, script12_6, script12_7, script12_8],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'mDW6crrUVpA',
        thumbnail: 'https://img.youtube.com/vi/mDW6crrUVpA/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(61, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-06'),
      },
      // 13번 뉴스
      { 
        title: '"하루만 일해도 40만 원"‥코로나 이후 몸값 \'껑충\'',
        category: Category.SOCIETY,
        tags: [tag13_1, tag13_2, tag13_3],
        scripts: [script13_1, script13_2, script13_3, script13_4, script13_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'IL_-MlTZAmQ',
        thumbnail: 'https://img.youtube.com/vi/IL_-MlTZAmQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(36, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-04-07'),
      },
      // 14번 뉴스
      { 
        title: '누리호 2차 발사 성공.."우주시대 도약"',
        category: Category.SOCIETY,
        tags: [tag14_1, tag14_2, tag14_3, tagRecommend],
        scripts: [script14_1, script14_2, script14_3, script14_4, script14_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'srjLy3NQO6w',
        thumbnail: 'https://img.youtube.com/vi/srjLy3NQO6w/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(29, 47),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-21'),
      },
      // 15번 뉴스
      { 
        title: '‘국민 MC’ 송해 씨 별세…빈소 애도 물결',
        category: Category.ENTERTAINMENT,
        tags: [tag15_1, tag15_2, tag15_3],
        scripts: [script15_1, script15_2, script15_3, script15_4, script15_5, script15_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'fbUYD6Nk3aA',
        thumbnail: 'https://img.youtube.com/vi/fbUYD6Nk3aA/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(31, 2),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-08'),
      },
      // 16번 뉴스
      { 
        title: '윤 대통령, 친인척 채용 논란에 "선거운동 함께한 동지"',
        category: Category.POLITICS,
        tags: [tag16_1, tag16_2, tag16_3],
        scripts: [script16_1, script16_2, script16_3, script16_4],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: '8g1Vh4XSngw',
        thumbnail: 'https://img.youtube.com/vi/8g1Vh4XSngw/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(35, 81),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-08'),
      },
      // 17번 뉴스
      { 
        title: '식약처 “야생버섯 식중독 위험…섭취 삼가야”',
        category: Category.SOCIETY,
        tags: [tag17_1, tag17_2, tag17_3],
        scripts: [script17_1, script17_2, script17_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'qKiGmo1VDnQ',
        thumbnail: 'https://img.youtube.com/vi/qKiGmo1VDnQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(29, 41),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-06'),
      },    
      // 18번 뉴스
      { 
        title: '법원, \'검단 식구들\' 주범에 징역 5년 선고',
        category: Category.SOCIETY,
        tags: [tag18_1, tag18_2, tag18_3],
        scripts: [script18_1, script18_2, script18_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: '7Vjdrppm83M',
        thumbnail: 'https://img.youtube.com/vi/7Vjdrppm83M/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(28, 92),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-07'),
      }, 
      // 19번 뉴스
      { 
        title: '토종닭 신선육 가격 담합한 9개 사업자에 과징금',
        category: Category.SOCIETY,
        tags: [tag19_1, tag19_2, tag19_3],
        scripts: [script19_1, script19_2, script19_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'yqGnXRY6ii8',
        thumbnail: 'https://img.youtube.com/vi/yqGnXRY6ii8/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(34, 19),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-05-12'),
      },       
      // 20번 뉴스
      { 
        title: '전기 · 수소차 통행료 할인, 화물차 심야할인 2년 연장',
        category: Category.SOCIETY,
        tags: [tag20_1, tag20_2, tag20_3],
        scripts: [script20_1, script20_2, script20_3, script20_4, script20_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'apvCTvWxc08',
        thumbnail: 'https://img.youtube.com/vi/apvCTvWxc08/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(40, 50),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-03'),
      },    
      // 21번 뉴스
      { 
        title: 'IMF 총재 "세계 경제전망 상당히 어두워져"',
        category: Category.WORLD,
        tags: [tag21_1, tag21_2, tag21_3],
        scripts: [script21_1, script21_2, script21_3],
        announcerGender: Gender.MEN,
        channel: Channel.MBC,
        link: 'jYnkP18MOVc',
        thumbnail: 'https://img.youtube.com/vi/jYnkP18MOVc/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(36, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-07'),
      },   
      // 22번 뉴스
      { 
        title: '"2년을 기다렸어요"‥보라색으로 물든 LA \'BTS 특수\'',
        category: Category.ENTERTAINMENT,
        tags: [tag22_1, tag22_2, tag22_3],
        scripts: [script22_1, script22_2, script22_3, script22_4, script22_5, script22_6, script22_7, script22_8, script22_9],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'tM7G9grxRvU',
        thumbnail: 'https://img.youtube.com/vi/tM7G9grxRvU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(41, 33),
        suitability: Suitability.MEDIUM,
        isEmbeddable: true,
        reportDate: new Date('2021-11-28'),
      },   
      // 23번 뉴스
      { 
        title: '중 국경절 연휴, 관광객 6억명…인파 속 \'노마스크\'',
        category: Category.WORLD,
        tags: [tag23_1, tag23_2, tag23_3],
        scripts: [script23_1, script23_2, script23_3, script23_4, script23_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.ETC,
        link: 'Ca6Wc_JepO8',
        thumbnail: 'https://img.youtube.com/vi/Ca6Wc_JepO8/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(28, 99),
        suitability: Suitability.MEDIUM,
        isEmbeddable: true,
        reportDate: new Date('2020-10-10'),
      },     
      // 24번 뉴스
      { 
        title: '오스카 빛낸 윤여정의 수어‥\'파란 리본\'도 화제',
        category: Category.ENTERTAINMENT,
        tags: [tag24_1, tag24_2, tag24_3],
        scripts: [script24_1, script24_2, script24_3, script24_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'Iiaf4LT7zbY',
        thumbnail: 'https://img.youtube.com/vi/Iiaf4LT7zbY/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(25, 81),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-03-08'),
      },         
      // 25번 뉴스
      { 
        title: '막강했던 \'우경화 상징\'…일본 정책 기조 바뀌나',
        category: Category.WORLD,
        tags: [tag25_1, tag25_2, tag25_3],
        scripts: [script25_1, script25_2, script25_3],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'p03Y9VRwCNA',
        thumbnail: 'https://img.youtube.com/vi/p03Y9VRwCNA/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(27, 27),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-08'),
      },    
      // 26번 뉴스
      { 
        title: '정준영 · 최종훈, 중형 선고되자…고개 숙이고 \'오열\'',
        category: Category.ENTERTAINMENT,
        tags: [tag26_1, tag26_2, tag26_3],
        scripts: [script26_1, script26_2, script26_3, script26_4],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'DK3UZOiYBA4',
        thumbnail: 'https://img.youtube.com/vi/DK3UZOiYBA4/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(23, 87),
        suitability: Suitability.MEDIUM,
        isEmbeddable: true,
        reportDate: new Date('2019-11-29'),
      },        
      // 27번 뉴스
      { 
        title: '영화배우 강수연 씨, 심정지 상태로 병원 이송',
        category: Category.ENTERTAINMENT,
        tags: [tag27_1, tag27_2, tag27_3],
        scripts: [script27_1, script27_2, script27_3, script27_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'M5rq2V-vLzc',
        thumbnail: 'https://img.youtube.com/vi/M5rq2V-vLzc/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(29, 56),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-05-05'),
      },
      // 28번 뉴스
      { 
        title: '일정 변경 항공사 마음대로…“환불도 안 됩니다”',
        category: Category.SOCIETY,
        tags: [tag28_1, tag28_2, tag28_3],
        scripts: [script28_1, script28_2, script28_3, script28_4, script28_5, script28_6],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'UgDrQsk46nQ',
        thumbnail: 'https://img.youtube.com/vi/UgDrQsk46nQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(41, 41),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-04'),
      },    
      // 29번 뉴스
      { 
        title: '"윤총한테 세 번 걸려"‥윤, \'삼부토건 봐주기\' 의혹 점입가경',
        category: Category.POLITICS,
        tags: [tag29_1, tag29_2, tag29_3],
        scripts: [script29_1, script29_2, script29_3, script29_4, script29_5, script29_6],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'B2bfgPd9ljk',
        thumbnail: 'https://img.youtube.com/vi/B2bfgPd9ljk/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(25, 12),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-02-25'),
      },    
      // 30번 뉴스
      { 
        title: '물가 치솟는데 월급은?…중산층 실질소득 오히려 줄어',
        category: Category.ECONOMY,
        tags: [tag30_1, tag30_2, tag30_3],
        scripts: [script30_1, script30_2, script30_3, script30_4],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'ze8mQX5Y5kQ',
        thumbnail: 'https://img.youtube.com/vi/ze8mQX5Y5kQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(24, 3),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-07'),
      },       
      // 31번 뉴스
      { 
        title: '미 시위대 5600여 명 체포·부상자 속출…전쟁터 방불',
        category: Category.WORLD,
        tags: [tag31_1, tag31_2, tag31_3],
        scripts: [script31_1, script31_2, script31_3, script31_4, script31_5],
        announcerGender: Gender.MEN,
        channel: Channel.ETC,
        link: 'Gy39BunUfX4',
        thumbnail: 'https://img.youtube.com/vi/Gy39BunUfX4/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(34, 7),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2020-06-03'),
      },    
      // 32번 뉴스
      { 
        title: '외부 충격도 없는데 가라앉는 경제…무엇이 문제일까',
        category: Category.ECONOMY,
        tags: [tag32_1, tag32_2, tag32_3],
        scripts: [script32_1, script32_2, script32_3],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'PwXCLeIzv5A',
        thumbnail: 'https://img.youtube.com/vi/PwXCLeIzv5A/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(21, 7),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2019-10-24'),
      },        
      // 33번 뉴스
      { 
        title: '마르코스·이멜다 아들 ‘봉봉 마르코스’, 필리핀 대권 유력',
        category: Category.WORLD,
        tags: [tag33_1, tag33_2, tag33_3],
        scripts: [script33_1, script33_2, script33_3, script33_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'M6wpIFo_yBI',
        thumbnail: 'https://img.youtube.com/vi/M6wpIFo_yBI/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(22, 81),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-02-20'),
      },      
      // 34번 뉴스
      { 
        title: '완도 실종 일가족 ‘사인 불명’…정밀 검사 의뢰',
        category: Category.SOCIETY,
        tags: [tag34_1, tag34_2, tag34_3],
        scripts: [script34_1, script34_2, script34_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'ygpfA2W6L5s',
        thumbnail: 'https://img.youtube.com/vi/ygpfA2W6L5s/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(29, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-30'),
      },      
      // 35번 뉴스
      { 
        title: '허준이 교수 \'수학계 노벨상\' 필즈상 한국계 최초 수상',
        category: Category.SOCIETY,
        tags: [tag35_1, tag35_2, tag35_3],
        scripts: [script35_1, script35_2, script35_3, script35_4, script35_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'vRRGRSRFUXQ',
        thumbnail: 'https://img.youtube.com/vi/vRRGRSRFUXQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(25, 49),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-05'),
      },                  
      // 36번 뉴스
      { 
        title: '\'오징어 게임\' 오영수, 골든글로브 남우조연상 수상',
        category: Category.ENTERTAINMENT,
        tags: [tag36_1, tag36_2, tag36_3],
        scripts: [script36_1, script36_2, script36_3, script36_4],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'V3B6JTh7uoQ',
        thumbnail: 'https://img.youtube.com/vi/V3B6JTh7uoQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(30, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-01-10'),
      },  
      // 37번 뉴스
      { 
        title: '부가가치세 면제하면 커피값 내릴까?',
        category: Category.ECONOMY,
        tags: [tag37_1, tag37_2, tag37_3],
        scripts: [script37_1, script37_2, script37_3, script37_4, script37_5, script37_6, script37_7],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: '90eAX6cEyPs',
        thumbnail: 'https://img.youtube.com/vi/90eAX6cEyPs/hqdefault.jpg',
        startTime: new Time(10, 33),
        endTime: new Time(65, 34),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-05'),
      },      
      // 38번 뉴스
      { 
        title: '신차 발표 8일 앞두고‥두 아이의 아빠, 현대차 디자이너의 죽음',
        category: Category.SOCIETY,
        tags: [tag38_1, tag38_2, tag38_3],
        scripts: [script38_1, script38_2, script38_3, script38_4, script38_5],
        announcerGender: Gender.MEN,
        channel: Channel.MBC,
        link: 'yZvyeH3GPRA',
        thumbnail: 'https://img.youtube.com/vi/yZvyeH3GPRA/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(31, 43),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-01-11'),
      },   
       // 39번 뉴스
      { 
        title: '통일부 “북송 잘못된 부분 있어”…자필 귀순의향서 논란',
        category: Category.SOCIETY,
        tags: [tag39_1, tag39_2, tag39_3],
        scripts: [script39_1, script39_2, script39_3, script39_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'umVXmyNfkr0',
        thumbnail: 'https://img.youtube.com/vi/umVXmyNfkr0/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(24, 9),
        suitability: Suitability.MEDIUM,
        isEmbeddable: true,
        reportDate: new Date('2022-07-11'),
      }, 
      // 40번 뉴스
      { 
        title: '다이빙 시켜 남편 살해‥아내·공범 공개수배',
        category: Category.SOCIETY,
        tags: [tag40_1, tag40_2, tag40_3],
        scripts: [script40_1, script40_2, script40_3, script40_4, script40_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 's5DQBY9dMd4',
        thumbnail: 'https://img.youtube.com/vi/s5DQBY9dMd4/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(26, 19),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-03-30'),
      },        
      // 41번 뉴스
      { 
        title: '\'국가부도\' 스리랑카 대통령 결국 사임‥\'도미노\' 우려',
        category: Category.SOCIETY,
        tags: [tag41_1, tag41_2, tag41_3],
        scripts: [script41_1, script41_2, script41_3, script41_4, script41_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: '0pu4Se9jdBU',
        thumbnail: 'https://img.youtube.com/vi/0pu4Se9jdBU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(25, 10),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-10'),
      },  
      // 42번 뉴스
      { 
        title: '부모보다 가난한 첫 세대…“잘 배웠지만, 희망 없어”',
        category: Category.POLITICS,
        tags: [tag42_1, tag42_2, tag42_3],
        scripts: [script42_1, script42_2, script42_3, script42_4, script42_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'hJ0B64QzRFA',
        thumbnail: 'https://img.youtube.com/vi/hJ0B64QzRFA/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(46, 24),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-11-30'),
      },   
      // 43번 뉴스
      { 
        title: '방탄소년단, 아시아 최초 AMA 3관왕…그래미만 남았다',
        category: Category.ENTERTAINMENT,
        tags: [tag43_1, tag43_2, tag43_3],
        scripts: [script43_1, script43_2, script43_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'zrZCIEpLqOA',
        thumbnail: 'https://img.youtube.com/vi/zrZCIEpLqOA/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(21, 4),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-11-22'),
      },    
      // 44번 뉴스
      { 
        title: '빅뱅 승리, \'성매매 알선\' 징역 3년…법정 구속',
        category: Category.ENTERTAINMENT,
        tags: [tag44_1, tag44_2, tag44_3],
        scripts: [script44_1, script44_2, script44_3, script44_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'Frq3s4KhgF4',
        thumbnail: 'https://img.youtube.com/vi/Frq3s4KhgF4/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(47, 14),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-08-12'),
      },        
      // 45번 뉴스
      { 
        title: '아이돌학교도 투표 조작 정황…제작진 2명 구속영장',
        category: Category.ENTERTAINMENT,
        tags: [tag45_1, tag45_2, tag45_3],
        scripts: [script45_1, script45_2, script45_3],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: '1xTirJm-CVM',
        thumbnail: 'https://img.youtube.com/vi/1xTirJm-CVM/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(20, 2),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2020-02-14'),
      },   
      // 46번 뉴스
      { 
        title: '"권도형 인생 끝, 도망 못 가"…비밀 모임 만들어 추적',
        category: Category.SOCIETY,
        tags: [tag46_1, tag46_2, tag46_3],
        scripts: [script46_1, script46_2, script46_3],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'fXaU9mwG5Bg',
        thumbnail: 'https://img.youtube.com/vi/fXaU9mwG5Bg/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(21, 33),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-08'),
      },
      // 47번 뉴스            
      { 
        title: '바이든 한국 왔을 때 \'도발 없었던\' 북한, 이유 있었다',
        category: Category.SOCIETY,
        tags: [tag47_1, tag47_2, tag47_3],
        scripts: [script47_1, script47_2, script47_3],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'AMFsyoRlShM',
        thumbnail: 'https://img.youtube.com/vi/AMFsyoRlShM/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(22, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-05-23'),
      },       
      // 48번 뉴스            
      { 
        title: '\'스쳐도 실격\' 현실로‥ 도 넘은 편파 판정 "제소"',
        category: Category.UNSPECIFIED,
        tags: [tag48_1, tag48_2, tag48_3],
        scripts: [script48_1, script48_2, script48_3, script48_4, script48_5],
        announcerGender: Gender.MEN,
        channel: Channel.MBC,
        link: 'OCEd79FBPz44',
        thumbnail: 'https://img.youtube.com/vi/OCEd79FBPz4/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(39, 16),
        suitability: Suitability.UNSPECIFIED,
        isEmbeddable: true,
        reportDate: new Date('2022-02-08'),
      },  
      // 49번 뉴스            
      { 
        title: '40억 농협 횡령사건 \'반전\'...경찰, 복권방 압수수색',
        category: Category.SOCIETY,
        tags: [tag49_1, tag49_2, tag49_3],
        scripts: [script49_1, script49_2, script49_3, script49_4, script49_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.ETC,
        link: 'qNyYtkg37JI',
        thumbnail: 'https://img.youtube.com/vi/qNyYtkg37JI/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(27, 59),
        suitability: Suitability.UNSPECIFIED,
        isEmbeddable: true,
        reportDate: new Date('2021-08-23'),
      },    
      // 50번 뉴스            
      { 
        title: '연세대 청소 노동자 소송 논란 ‘확산’…학교는 ‘묵묵부답’',
        category: Category.SOCIETY,
        tags: [tag50_1, tag50_2, tag50_3],
        scripts: [script50_1, script50_2, script50_3, script50_4],
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: '0wfYtl3Ao24',
        thumbnail: 'https://img.youtube.com/vi/0wfYtl3Ao24/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(22, 75),
        suitability: Suitability.UNSPECIFIED,
        isEmbeddable: true,
        reportDate: new Date('2022-07-06'),
      },                
      // 51번 뉴스
      {
        title: '여름 축제도 취소‥코로나 \'2만 명대\' 재확산',
        category: Category.SOCIETY,
        tags: [tag51_1, tag51_2, tag51_3],
        scripts: [script51_1, script51_2, script51_3, script51_4, script51_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: '8LGj29XHkvU',
        thumbnail: 'https://img.youtube.com/vi/8LGj29XHkvU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(28, 14),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-09'),
      },
      // 52번 뉴스
      {
        title: '이준석, 오늘도 잠행‥당내선 사퇴 압박 "책임지는 게 도리"',
        category: Category.POLITICS,
        tags: [tag52_1, tag52_2, tag52_3],
        scripts: [script52_1, script52_2, script52_3, script52_4,script52_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: '8-NFm1z_ZuY',
        thumbnail: 'https://img.youtube.com/vi/8-NFm1z_ZuY/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(25, 31),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-10'),
      },
      // 53번 뉴스
      {
        title: '\'액체 생검\'…"\'피 검사\'로 암 진단한다"',
        category: Category.SOCIETY,
        tags: [tag53_1, tag53_2, tag53_3],
        scripts: [script53_1, script53_2, script53_3, script53_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'h04FcHw_5vU',
        thumbnail: 'https://img.youtube.com/vi/h04FcHw_5vU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(18, 86),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-26'),
      },
      // 54번 뉴스
      {
        title: '\'BA.2.75\' 코로나 변이, 국내 첫 확인…"해외 이력 없다"',
        category: Category.SOCIETY,
        tags: [tag54_1, tag54_2, tag54_3],
        scripts: [script54_1, script54_2, script54_3, script54_4, script54_5],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'SzZFH--m0_M',
        thumbnail: 'https://img.youtube.com/vi/SzZFH--m0_M/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(30, 97),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-14'),
      },
      // 55번 뉴스
      {
        title: 'IOC "발리예바, 금지 약물 양성"',
        category: Category.UNSPECIFIED,
        tags: [tag55_1, tag55_2, tag55_3],
        scripts: [script55_1, script55_2, script55_3, script55_4, script55_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'KUaQQFy2gUE',
        thumbnail: 'https://img.youtube.com/vi/KUaQQFy2gUE/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(25, 28),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-02-11'),
      },
      // 56번 뉴스
      {
        title: '반창고 투혼 나달 \'메이저 20승\'…페더러도 축하 인사',
        category: Category.UNSPECIFIED,
        tags: [tag56_1, tag56_2, tag56_3],
        scripts: [script56_1, script56_2, script56_3, script56_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.ETC,
        link: 'ns-2KhzO1JQ',
        thumbnail: 'https://img.youtube.com/vi/ns-2KhzO1JQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(24, 75),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2020-10-12'),
      },
      // 57번 뉴스
      {
        title: '박지현 "민주당 당 대표 출마할 것"',
        category: Category.POLITICS,
        tags: [tag57_1, tag57_2, tag57_3],
        scripts: [script57_1, script57_2, script57_3],        
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'wZ_FrpTI3Z0',
        thumbnail: 'https://img.youtube.com/vi/wZ_FrpTI3Z0/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(24, 78),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-03'),
      },
      // 58번 뉴스
      {
        title: '"피크타임 4시간 넘게 허탕"…수도권 4단계에 대리 기사도 \'타격\'',
        category: Category.SOCIETY,
        tags: [tag58_1, tag58_2, tag58_3],
        scripts: [script58_1, script58_2, script58_3, script58_4],
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: 'gDWB3p0vu50',
        thumbnail: 'https://img.youtube.com/vi/gDWB3p0vu50/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(20, 77),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-15'),
      },
      // 59번 뉴스
      {
        title: '신생아 떨어뜨리고 \'쉬쉬\'…"부모는 3년을 몰라"',
        category: Category.SOCIETY,
        tags: [tag59_1, tag59_2, tag59_3],
        scripts: [script59_1, script59_2, script59_3, script59_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: '_qaQWs4vLkc',
        thumbnail: 'https://img.youtube.com/vi/_qaQWs4vLkc/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(24, 85),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2019-04-15'),
      },
      // 60번 뉴스
      {
        title: '\'낙태권\' 50년 만에 폐지됐다…미국 전역 동시다발 시위',
        category: Category.WORLD,
        tags: [tag60_1, tag60_2, tag60_3],
        scripts: [script60_1, script60_2, script60_3, script60_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'Pu_sp3By1W88',
        thumbnail: 'https://img.youtube.com/vi/Pu_sp3By1W8/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(20, 42),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-25'),
      },
      // 61번 뉴스
      {
        title: '미국 물가 13년 만에 최고…돈 줄 조일 듯',
        category: Category.WORLD,
        tags: [tag61_1, tag61_2, tag61_3],
        scripts: [script61_1, script61_2, script61_3, script61_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: '1vAmJhf6HEE',
        thumbnail: 'https://img.youtube.com/vi/1vAmJhf6HEE/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(21, 32),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-06-11'),
      },
      // 62번 뉴스
      {
        title: 'BTS 성공 뒤엔 남다른 팬덤 있었다…아미(ARMY)가 바꾸는 세상',
        category: Category.ENTERTAINMENT,
        tags: [tag62_1, tag62_2, tag62_3],
        scripts: [script62_1, script62_2, script62_3, script62_4],
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: 'Qs71tXJ8Z7w',
        thumbnail: 'https://img.youtube.com/vi/Qs71tXJ8Z7w/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(22, 8),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-15'),
      },
      // 63번 뉴스
      { 
        title: '50대도 4차 접종…“거리두기는 자발적으로”',
        category: Category.SOCIETY,
        tags: [tag63_1, tag63_2, tag63_3],
        scripts: [script63_1, script63_2, script63_3, script63_4],
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: 'L8Cqr4rsW_g',
        thumbnail: 'https://img.youtube.com/vi/L8Cqr4rsW_g/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(22, 29),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-13'),
      },
      // 64번 뉴스
      { 
        title: '"한 달 14일 야근인데 수당은 없다" - 공짜 노동 부추기는 포괄임금제',
        category: Category.SOCIETY,
        tags: [tag64_1, tag64_2, tag64_3],
        scripts: [script64_1, script64_2, script64_3, script64_4, script64_5, script64_6, script64_7, script64_8, script64_9],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'LyWBOYDfRzU',
        thumbnail: 'https://img.youtube.com/vi/LyWBOYDfRzU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(37, 47),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-06'),
      },
      // 65번 뉴스
      { 
        title: '\'가격인상\'보다 \'반찬빼기\'',
        category: Category.ECONOMY,
        tags: [tag65_1, tag65_2, tag65_3],
        scripts: [script65_1, script65_2, script65_3, script65_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'B_Kpyf7G5Ic',
        thumbnail: 'https://img.youtube.com/vi/B_Kpyf7G5Ic/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(22, 58),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-12'),
      },
      // 66번 뉴스
      { 
        title: '밀고, 잡아당기고, 부딪히고…뭘 해도 되는 중국',
        category: Category.UNSPECIFIED,
        tags: [tag66_1, tag66_2, tag66_3],
        scripts: [script66_1, script66_2, script66_3, script66_4],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'cN3YSFf8RXE',
        thumbnail: 'https://img.youtube.com/vi/cN3YSFf8RXE/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(26, 8),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-02-08'),
      },
      // 67번 뉴스
      { 
        title: '코로나 와중 미 \'대선 불복\' 시위…상당수 \'노마스크\'',
        category: Category.WORLD,
        tags: [tag67_1, tag67_2, tag67_3],
        scripts: [script67_1, script67_2, script67_3, script67_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.ETC,
        link: 'ekvVWT001Mg',
        thumbnail: 'https://img.youtube.com/vi/ekvVWT001Mg/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(20, 32),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2020-11-15'),
      },    
      // 68번 뉴스
      { 
        title: '관계는 냉랭하지만…일본 주택가엔 \'K-슈퍼\' 등장',
        category: Category.WORLD,
        tags: [tag68_1, tag68_2, tag68_3],
        scripts: [script68_1, script68_2, script68_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'wYu0ECak7S0',
        thumbnail: 'https://img.youtube.com/vi/wYu0ECak7S0/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(19, 24),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-12-04'),
      }, 
      // 69번 뉴스
      { 
        title: '바이든 당선 초읽기…트럼프가 낸 소송은 줄줄이 기각',
        category: Category.WORLD,
        tags: [tag69_1, tag69_2, tag69_3],
        scripts: [script69_1, script69_2, script69_3, script69_4, script69_5, script69_6],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'yv1nf5vfabw',
        thumbnail: 'https://img.youtube.com/vi/yv1nf5vfabw/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(39, 13),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2020-11-06'),
      },       
      // 70번 뉴스
      { 
        title: '일본 국회의원 99명, 2년여 만에 야스쿠니 집단 참배',
        category: Category.WORLD,
        tags: [tag70_1, tag70_2, tag70_3],
        scripts: [script70_1, script70_2, script70_3, script70_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.ETC,
        link: 'zpRqs3y_iLI',
        thumbnail: 'https://img.youtube.com/vi/zpRqs3y_iLI/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(34, 99),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-12-07'),
      },    
      // 71번 뉴스
      { 
        title: '\'5살 동희 군\' 사망사고 의사, 또 의료사고?',
        category: Category.SOCIETY,
        tags: [tag71_1, tag71_2, tag71_3],
        scripts: [script71_1, script71_2, script71_3, script71_4],
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: 'iC0VfyuzEi4',
        thumbnail: 'https://img.youtube.com/vi/iC0VfyuzEi4/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(22, 23),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-03-02'),
      },   
      // 72번 뉴스
      { 
        title: '환자 숨진 성형외과 CCTV‥방 하나에 수술대 2개',
        category: Category.SOCIETY,
        tags: [tag72_1, tag72_2, tag72_3],
        scripts: [script72_1, script72_2, script72_3, script72_4, script72_5, script72_6],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'xEU8S8Wlcb8',
        thumbnail: 'https://img.youtube.com/vi/xEU8S8Wlcb8/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(38, 26),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-03-29'),
      },   
      // 73번 뉴스
      { 
        title: '백내장 수술 후 "1m 앞 안 보여"…부작용 속출 이유',
        category: Category.SOCIETY,
        tags: [tag73_1, tag73_2, tag73_3],
        scripts: [script73_1, script73_2, script73_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: '4hKklbYHvlU',
        thumbnail: 'https://img.youtube.com/vi/4hKklbYHvlU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(20, 18),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-07'),
      },     
      // 74번 뉴스
      { 
        title: '경고등 켜진 2030 세대..."영끌 실패로 박탈감 가중"',
        category: Category.ECONOMY,
        tags: [tag74_1, tag74_2, tag74_3],
        scripts: [script74_1, script74_2, script74_3, script74_4, script74_5, script74_6],
        announcerGender: Gender.MEN,
        channel: Channel.ETC,
        link: 'pQ70M2ZVwmY',
        thumbnail: 'https://img.youtube.com/vi/pQ70M2ZVwmY/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(30, 43),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-14'),
      },         
      // 75번 뉴스
      { 
        title: '"희망절벽 세대라…" 코인 투자 2030 목소리 들어보니',
        category: Category.ECONOMY,
        tags: [tag75_1, tag75_2, tag75_3],
        scripts: [script75_1, script75_2, script75_3, script75_4, script75_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.ETC,
        link: 'VukbJLIsvJU',
        thumbnail: 'https://img.youtube.com/vi/VukbJLIsvJU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(27, 9),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-05-23'),
      },    
      // 76번 뉴스
      { 
        title: '퀴어축제 \'하루만\' 열라는 서울시…"성소수자 차별" 비판',
        category: Category.SOCIETY,
        tags: [tag76_1, tag76_2, tag76_3],
        scripts: [script76_1, script76_2, script76_3, script76_4, script76_5, script76_6],
        announcerGender: Gender.MEN,
        channel: Channel.ETC,
        link: 'DfRJ3RTFud8',
        thumbnail: 'https://img.youtube.com/vi/DfRJ3RTFud8/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(20, 72),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-15'),
      },        
      // 77번 뉴스
      { 
        title: 'BTS "그래미 눈물났지만 언제든 도전 가능"...병역 조속 결론 촉구',
        category: Category.ENTERTAINMENT,
        tags: [tag77_1, tag77_2, tag77_3],
        scripts: [script77_1, script77_2, script77_3, script77_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.ETC,
        link: 'gBX4lQoV6cc',
        thumbnail: 'https://img.youtube.com/vi/gBX4lQoV6cc/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(20, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-04-10'),
      },
      // 78번 뉴스
      { 
        title: '돌아온 \'기생충\' 주역들…송강호 "끊임없는 성원 덕분"',
        category: Category.ENTERTAINMENT,
        tags: [tag78_1, tag78_2, tag78_3],
        scripts: [script78_1, script78_2, script78_3, script78_4, script78_5],
        announcerGender: Gender.MEN,
        channel: Channel.ETC,
        link: 'IEXciQuzAUg',
        thumbnail: 'https://img.youtube.com/vi/IEXciQuzAUg/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(27, 29),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2020-02-12'),
      },    
      // 79번 뉴스
      { 
        title: '미 상무장관 “전례 없는 경제 성장…침체 빠질 이유 없어”',
        category: Category.WORLD,
        tags: [tag79_1, tag79_2, tag79_3],
        scripts: [script79_1, script79_2, script79_3],
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: 'TxsLv0E6III',
        thumbnail: 'https://img.youtube.com/vi/TxsLv0E6III/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(27, 33),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-11'),
      },    
      // 80번 뉴스
      { 
        title: '민주당 철야농성 돌입…"17조원 규모 추경 처리" 촉구',
        category: Category.POLITICS,
        tags: [tag80_1, tag80_2, tag80_3],
        scripts: [script80_1, script80_2, script80_3, script80_4],
        announcerGender: Gender.MEN,
        channel: Channel.ETC,
        link: 'G71eiakBObU',
        thumbnail: 'https://img.youtube.com/vi/G71eiakBObU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(32, 22),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-02-18'),
      },       
      // 81번 뉴스
      { 
        title: '김종인 찾아간 윤석열…"내달 초 광주서 사과하겠다"',
        category: Category.POLITICS,
        tags: [tag81_1, tag81_2, tag81_3],
        scripts: [script81_1, script81_2, script81_3, script81_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.ETC,
        link: 'MW4xaQAH2AY',
        thumbnail: 'https://img.youtube.com/vi/MW4xaQAH2AY/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(21, 88),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-10-23'),
      },    
      // 82번 뉴스
      { 
        title: '종부세, \'주택 수\' 아닌 \'가격\'으로 부과 방침',
        category: Category.ECONOMY,
        tags: [tag82_1, tag82_2, tag82_3],
        scripts: [script82_1, script82_2, script82_3, script82_4, script82_5, script82_6],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'eGemUhw0Xd4',
        thumbnail: 'https://img.youtube.com/vi/eGemUhw0Xd4/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(53, 5),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-15'),
      },        
      // 83번 뉴스
      { 
        title: '[속보] 손흥민, 22,23호 골...아시아 선수 최초 EPL 득점왕 등극',
        category: Category.UNSPECIFIED,
        tags: [tag83_1, tag83_2, tag83_3],
        scripts: [script83_1, script83_2, script83_3, script83_4, script83_5],
        announcerGender: Gender.MEN,
        channel: Channel.ETC,
        link: 'rsfoqv94Oco',
        thumbnail: 'https://img.youtube.com/vi/rsfoqv94Oco/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(51, 54),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-05-23'),
      },      
      // 84번 뉴스
      { 
        title: '어두워진 우리 경제전망…1,2위 수출국도 \'암울\'',
        category: Category.ECONOMY,
        tags: [tag84_1, tag84_2, tag84_3],
        scripts: [script84_1, script84_2, script84_3, script84_4],
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: 'n6U0V_Ju_Rk',
        thumbnail: 'https://img.youtube.com/vi/n6U0V_Ju_Rk/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(25, 89),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-08'),
      },      
      // 85번 뉴스
      { 
        title: '중학생 부문 한국신기록 “육상 100m 9초대 기록이 목표”',
        category: Category.UNSPECIFIED,
        tags: [tag85_1, tag85_2, tag85_3],
        scripts: [script85_1, script85_2, script85_3],
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: '34ErqBhYDwU',
        thumbnail: 'https://img.youtube.com/vi/34ErqBhYDwU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(24, 23),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-04'),
      },                  
      // 86번 뉴스
      { 
        title: '13년 만의 고환율‥유학생 부모 "얘야‥돈 부치기 힘들다"',
        category: Category.ECONOMY,
        tags: [tag86_1, tag86_2, tag86_3],
        scripts: [script86_1, script86_2, script86_3, script86_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'bSh_VB4VZNM',
        thumbnail: 'https://img.youtube.com/vi/bSh_VB4VZNM/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(21, 96),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-11'),
      },  
      // 87번 뉴스
      { 
        title: '“서울·경기 모임-행사 취소, 스포츠 무관중” 달라지는 것은?',
        category: Category.SOCIETY,
        tags: [tag87_1, tag87_2, tag87_3],
        scripts: [script87_1, script87_2, script87_3],
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: '5z2qWVnlaeA',
        thumbnail: 'https://img.youtube.com/vi/5z2qWVnlaeA/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(23, 37),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2020-08-15'),
      },      
      // 88번 뉴스
      { 
        title: '‘우상혁, 새 역사 썼다’ 한국 육상 사상 첫 다이아몬드리그 우승',
        category: Category.UNSPECIFIED,
        tags: [tag88_1, tag88_2, tag88_3],
        scripts: [script88_1, script88_2, script88_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: '0NSBLBkDV1M',
        thumbnail: 'https://img.youtube.com/vi/0NSBLBkDV1M/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(20, 97),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-05-14'),
      },   
       // 89번 뉴스
      { 
        title: '늦깎이 합격생 검찰총장에서 대통령…정치 초년생의 파란',
        category: Category.POLITICS,
        tags: [tag89_1, tag89_2, tag89_3],
        scripts: [script89_1, script89_2, script89_3, script89_4, script89_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'uA1s8pUgZT0',
        thumbnail: 'https://img.youtube.com/vi/uA1s8pUgZT0/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(22, 56),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-03-10'),
      }, 
      // 90번 뉴스
      { 
        title: '뉴욕타임즈, \'문화계 신성\'에 오징어게임 이정재 선정',
        category: Category.UNSPECIFIED,
        tags: [tag90_1, tag90_2, tag90_3],
        scripts: [script90_1, script90_2, script90_3],
        announcerGender: Gender.MEN,
        channel: Channel.MBC,
        link: '8QrYEhY_COI',
        thumbnail: 'https://img.youtube.com/vi/8QrYEhY_COI/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(29, 15),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-12-17'),
      },        
      // 91번 뉴스
      { 
        title: 'IMF "피라미드 사기" 루나 사태 후폭풍‥2차 고소 임박',
        category: Category.ECONOMY,
        tags: [tag91_1, tag91_2, tag91_3],
        scripts: [script91_1, script91_2, script91_3, script91_4],
        announcerGender: Gender.MEN,
        channel: Channel.MBC,
        link: '956U1BVL6c8',
        thumbnail: 'https://img.youtube.com/vi/956U1BVL6c8/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(22, 20),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-05-24'),
      },  
      // 92번 뉴스
      { 
        title: '"붓 있길래 낙서"…5억 그림에 페인트 칠한 20대 남녀',
        category: Category.UNSPECIFIED,
        tags: [tag92_1, tag92_2, tag92_3],
        scripts: [script92_1, script92_2, script92_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'EZIiaLGR_lU',
        thumbnail: 'https://img.youtube.com/vi/EZIiaLGR_lU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(19, 72),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-03-30'),
      },   
      // 93번 뉴스
      { 
        title: '반성 없었던 민주당‥혹독한 재심판',
        category: Category.POLITICS,
        tags: [tag93_1, tag93_2, tag93_3],
        scripts: [script93_1, script93_2, script93_3],
        announcerGender: Gender.MEN,
        channel: Channel.MBC,
        link: 'qU_2Aedzt88',
        thumbnail: 'https://img.youtube.com/vi/qU_2Aedzt88/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(24, 87),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-02'),
      },    
      // 94번 뉴스
      { 
        title: '\'빅스텝\' 밟자마자 예적금 금리도 재빠르게 인상',
        category: Category.ECONOMY,
        tags: [tag94_1, tag94_2, tag94_3],
        scripts: [script94_1, script94_2, script94_3, script94_4, script94_5, script94_6, script94_7],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'P8fLOfham-8',
        thumbnail: 'https://img.youtube.com/vi/P8fLOfham-8/hqdefault.jpg',
        startTime: new Time(7, 23),
        endTime: new Time(69, 41),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-14'),
      },        
      // 95번 뉴스
      { 
        title: '벤투호, 월드컵 최종 예선 중동 5개 팀과 한 조 ',
        category: Category.UNSPECIFIED,
        tags: [tag95_1, tag95_2, tag95_3],
        scripts: [script95_1, script95_2, script95_3, script95_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'CfMeWX7BAIg',
        thumbnail: 'https://img.youtube.com/vi/CfMeWX7BAIg/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(35, 48),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-07-01'),
      },   
      // 96번 뉴스
      { 
        title: '한미 기준금리 역전 \'기정사실\'‥연말까지 지속',
        category: Category.ECONOMY,
        tags: [tag96_1, tag96_2, tag96_3],
        scripts: [script96_1, script96_2, script96_3, script96_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'JXM9kwgGJyE',
        thumbnail: 'https://img.youtube.com/vi/JXM9kwgGJyE/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(38, 39),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-17'),
      },
      // 97번 뉴스            
      { 
        title: '"\'100% 온라인 수업\' 신입 유학생, 미국 못 들어온다"',
        category: Category.SOCIETY,
        tags: [tag97_1, tag97_2, tag97_3],
        scripts: [script97_1, script97_2, script97_3],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: '0Hq3zx_jJE0',
        thumbnail: 'https://img.youtube.com/vi/0Hq3zx_jJE0/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(20, 17),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2020-07-05'),
      },       
      // 98번 뉴스            
      { 
        title: '"눈에 띄지마, XXX야"… 차별 · 냉대에 한국 떠나',
        category: Category.SOCIETY,
        tags: [tag98_1, tag98_2, tag98_3],
        scripts: [script98_1, script98_2, script98_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'rCirYoEOL1c',
        thumbnail: 'https://img.youtube.com/vi/rCirYoEOL1c/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(21, 76),
        suitability: Suitability.UNSPECIFIED,
        isEmbeddable: true,
        reportDate: new Date('2021-10-28'),
      },  
      // 99번 뉴스            
      { 
        title: '6% 넘은 전세대출 금리‥\'월세화\' 가속',
        category: Category.ECONOMY,
        tags: [tag99_1, tag99_2, tag99_3],
        scripts: [script99_1, script99_2, script99_3, script99_4, script99_5, script99_6],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'UyKH-xufnGA',
        thumbnail: 'https://img.youtube.com/vi/UyKH-xufnGA/hqdefault.jpg',
        startTime: new Time(8, 84),
        endTime: new Time(57, 39),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-18'),
      },    
      // 100번 뉴스            
      { 
        title: '\'성전환 하사\' 변희수 씨 강제 전역…"나라 지킬 기회 달라"',
        category: Category.ECONOMY,
        tags: [tag100_1, tag100_2, tag100_3],
        scripts: [script100_1, script100_2, script100_3, script100_4, script100_5],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'u4Hwx80qr6k',
        thumbnail: 'https://img.youtube.com/vi/u4Hwx80qr6k/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(37, 60),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2020-01-22'),
      },
      // 101번 뉴스            
      { 
        title: '강제전역부터 취소판결까지…고(故) 변희수 하사가 던진 질문들',
        category: Category.SOCIETY,
        tags: [tag101_1, tag101_2, tag101_3],
        scripts: [script101_1, script101_2, script101_3, script101_4, script101_5, script101_6, script101_7],
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: 'JxBtHSnlI_I',
        thumbnail: 'https://img.youtube.com/vi/JxBtHSnlI_I/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(33, 6),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-10-30'),
      },              
      // 102번 뉴스            
      { 
        title: '김무성 "이재오·주호영 등 비박계 탈락은 문제 있어"',
        category: Category.POLITICS,
        tags: [tag102_1, tag102_2, tag102_3],
        scripts: [script102_1, script102_2, script102_3, script102_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.ETC,
        link: 'krec4DE8Mg8',
        thumbnail: 'https://img.youtube.com/vi/krec4DE8Mg8/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(56, 68),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2016-03-16'),
      },   
      // 103번 뉴스            
      { 
        title: '국정원, 판문점 USB 분석 착수…\'북한 원전\' 포함 여부 분석',
        category: Category.SOCIETY,
        tags: [tag103_1, tag103_2, tag103_3],
        scripts: [script103_1, script103_2, script103_3, script103_4],
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: 'Wt2ZhsHIiS8',
        thumbnail: 'https://img.youtube.com/vi/Wt2ZhsHIiS8/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(20, 4),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-17'),
      },         
      // 104번 뉴스            
      { 
        title: '[그래픽뉴스]북한 경제',
        category: Category.ECONOMY,
        tags: [tag104_1, tag104_2, tag104_3],
        scripts: [script104_1, script104_2, script104_3, script104_4, script104_5, script104_6, script104_7, script104_8,
          script104_9, script104_10, script104_11, script104_12, script104_13, script104_14, script104_15, script104_16, 
          script104_17, script104_18, script104_19, script104_20],
        announcerGender: Gender.WOMEN,
        channel: Channel.ETC,
        link: 's5B1HNVasIw',
        thumbnail: 'https://img.youtube.com/vi/s5B1HNVasIw/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(149, 78),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-12-23'),
      },     
      // 105번 뉴스            
      { 
        title: '[그래픽뉴스]IPEF',
        category: Category.WORLD,
        tags: [tag105_1, tag105_2, tag105_3],
        scripts: [script105_1, script105_2, script105_3, script105_4, script105_5, script105_6, script105_7, script105_8,
          script105_9, script105_10, script105_11, script105_12, script105_13, script105_14, script105_15],
        announcerGender: Gender.WOMEN,
        channel: Channel.ETC,
        link: 'sOFAGl_csSI',
        thumbnail: 'https://img.youtube.com/vi/sOFAGl_csSI/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(136, 48),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-05-23'),
      },        
      // 106번 뉴스            
      { 
        title: '오전엔 전화 안 받고 오후엔 받고…북한 속내는?',
        category: Category.SOCIETY,
        tags: [tag106_1, tag106_2, tag106_3],
        scripts: [script106_1, script106_2, script106_3, script106_4, script106_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'JdFzzzZ8czM',
        thumbnail: 'https://img.youtube.com/vi/JdFzzzZ8czM/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(21, 82),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2020-06-28'),
      },     
      // 107번 뉴스            
      { 
        title: '바이든, 시청률 대결서 이겼지만…차남 의혹에 \'곤혹\'',
        category: Category.WORLD,
        tags: [tag107_1, tag107_2, tag107_3],
        scripts: [script107_1, script107_2, script107_3, script107_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.ETC,
        link: 'GLM6pp-g8vs',
        thumbnail: 'https://img.youtube.com/vi/GLM6pp-g8vs/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(23, 58),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2020-10-17'),
      },    
      // 108번 뉴스            
      { 
        title: '반도체 인재 15만 명 양성…비수도권 대학은 불만',
        category: Category.SOCIETY,
        tags: [tag108_1, tag108_2, tag108_3],
        scripts: [script108_1, script108_2, script108_3],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'mo-jCIzIx9w',
        thumbnail: 'https://img.youtube.com/vi/mo-jCIzIx9w/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(21, 58),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-19'),
      },                  
      // 109번 뉴스            
      { 
        title: '높이뛰기 우상혁, 한국 육상 첫 \'세계선수권 은메달\'',
        category: Category.UNSPECIFIED,
        tags: [tag109_1, tag109_2, tag109_3],
        scripts: [script109_1, script109_2, script109_3, script109_4, script109_5],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'eI-6AH92trU',
        thumbnail: 'https://img.youtube.com/vi/eI-6AH92trU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(26, 46),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-19'),
      },     
      // 110번 뉴스            
      { 
        title: '[오픈마이크] 시각장애인 안내견의 하루…"어딜 개가!" 밥 먹으려다 7번 거절',
        category: Category.SOCIETY,
        tags: [tag110_1, tag110_2, tag110_3],
        scripts: [script110_1, script110_2, script110_3, script110_4, script110_5, script110_6],
        announcerGender: Gender.WOMEN,
        channel: Channel.ETC,
        link: 'jNPaPnKAvJ4',
        thumbnail: 'https://img.youtube.com/vi/jNPaPnKAvJ4/hqdefault.jpg',
        startTime: new Time(8, 98),
        endTime: new Time(39, 74),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2020-10-24'),
      },                
      // 111번 뉴스            
      { 
        title: '비위 의혹 프로파일러, 피의자 전환 정식 수사',
        category: Category.SOCIETY,
        tags: [tag111_1, tag111_2, tag111_3],
        scripts: [script111_1, script111_2, script111_3, script111_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: '-2KbmcbYaZg',
        thumbnail: 'https://img.youtube.com/vi/-2KbmcbYaZg/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(37, 84),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-18'),
      },            
      // 112번 뉴스            
      { 
        title: '한국여권으로 192곳 입국 쉬워…여권지수 세계 2위',
        category: Category.WORLD,
        tags: [tag112_1, tag112_2, tag112_3],
        scripts: [script112_1, script112_2, script112_3, script112_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'jiGkiYxh-mM',
        thumbnail: 'https://img.youtube.com/vi/jiGkiYxh-mM/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(38, 95),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-20'),
      },         
      // 113번 뉴스            
      { 
        title: '교실에서 총기난사하는데‥"제 말이 들리면 총을 내려놓으세요"',
        category: Category.WORLD,
        tags: [tag113_1, tag113_2, tag113_3],
        scripts: [script113_1, script113_2, script113_3, script113_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'LrJIn9DSDXk',
        thumbnail: 'https://img.youtube.com/vi/LrJIn9DSDXk/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(25, 72),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-18'),
      },    
      // 114번 뉴스            
      { 
        title: '유희열 \'결국\' 하차‥가요계 \'표절 논란\' 불붙나',
        category: Category.ENTERTAINMENT,
        tags: [tag114_1, tag114_2, tag114_3],
        scripts: [script114_1, script114_2, script114_3, script114_4],
        announcerGender: Gender.MEN,
        channel: Channel.MBC,
        link: 'kC5aPMN_Vv8',
        thumbnail: 'https://img.youtube.com/vi/kC5aPMN_Vv8/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(21, 44),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-18'),
      },        
      // 115번 뉴스            
      { 
        title: '총격 하루 전 통일교 건물에 발사‥"어머니, 통일교도 맞다"',
        category: Category.WORLD,
        tags: [tag115_1, tag115_2, tag115_3],
        scripts: [script115_1, script115_2, script115_3, script115_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'HMXa1IRMgts',
        thumbnail: 'https://img.youtube.com/vi/HMXa1IRMgts/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(22, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-11'),
      },        
      // 116번 뉴스            
      { 
        title: '최연소 당선인들, "부모님은 말렸지만 새로운 정치 해야죠"',
        category: Category.POLITICS,
        tags: [tag116_1, tag116_2, tag116_3],
        scripts: [script116_1, script116_2, script116_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: '0QfVlhyhkOY',
        thumbnail: 'https://img.youtube.com/vi/0QfVlhyhkOY/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(19, 50),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-05'),
      },        
      // 117번 뉴스            
      { 
        title: '서울시장 선거 \'송영길·오세훈\' 확정',
        category: Category.POLITICS,
        tags: [tag117_1, tag117_2, tag117_3],
        scripts: [script117_1, script117_2, script117_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'pnadYR36SIk',
        thumbnail: 'https://img.youtube.com/vi/pnadYR36SIk/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(23, 36),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-04-30'),
      },      
      // 118번 뉴스            
      { 
        title: '최저임금 \'차등 적용\' 충돌하나…"지불능력 안돼" "낙인효과"',
        category: Category.ECONOMY,
        tags: [tag118_1, tag118_2, tag118_3],
        scripts: [script118_1, script118_2, script118_3, script118_4, 
          script118_5, script118_6, script118_7, script118_8, script118_9],
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: '2m47_qzUJas',
        thumbnail: 'https://img.youtube.com/vi/2m47_qzUJas/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(58, 16),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-05-16'),
      },        
      // 119번 뉴스            
      { 
        title: '내년부터 가상 자산 상속·증여세 두 달 평균액 산정',
        category: Category.ECONOMY,
        tags: [tag119_1, tag119_2, tag119_3],
        scripts: [script119_1, script119_2, script119_3, script119_4],
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: '650zfP0heeE',
        thumbnail: 'https://img.youtube.com/vi/650zfP0heeE/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(39, 92),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-12-28'),
      },           
      // 120번 뉴스            
      { 
        title: '치솟는 외식물가에 치킨·햄버거값 매주 공개',
        category: Category.ECONOMY,
        tags: [tag120_1, tag120_2, tag120_3],
        scripts: [script120_1, script120_2, script120_3, script120_4,
          script120_5, script120_6, script120_7, script120_8],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: '-QZ6Nv-jX5c',
        thumbnail: 'https://img.youtube.com/vi/-QZ6Nv-jX5c/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(42, 75),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-02-23'),
      },          
      // 121번 뉴스
      {
        title: '음식 배달료 1만원 시대, 속 타는 식당 사장님들‥ 해법 있을까?',
        category: Category.ECONOMY,
        tags: [tag121_1, tag121_2, tag121_3],
        scripts: [script121_1, script121_2, script121_3],
        announcerGender: Gender.MEN,
        channel: Channel.MBC,
        link: '259IMRlCOTg',
        thumbnail: 'https://img.youtube.com/vi/259IMRlCOTg/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(19, 3),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-01-21'),
      },
      // 122번 뉴스
      {
        title: '디지털 작품이 2억 9천만 원 - 코인에 이어 NFT 투자 열풍, 위험하진 않을까?',
        category: Category.ECONOMY,
        tags: [tag122_1, tag122_2, tag122_3],
        scripts: [script122_1, script122_2, script122_3, script122_4, script122_5, script122_6, script122_7, script122_8, script122_9, script122_10, script122_11, script122_12, script122_13, script122_14, script122_15, script122_16],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: '9X4R08kKJEw',
        thumbnail: 'https://img.youtube.com/vi/9X4R08kKJEw/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(86, 4),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-04-12'),
      },
      // 123번 뉴스
      {
        title: 'ARM 인수한 엔비디아…반도체 격랑 속 국내 업체는?',
        category: Category.ECONOMY,
        tags: [tag123_1, tag123_2, tag123_3],
        scripts: [script123_1, script123_2, script123_3, script123_4, script123_5, script123_6],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'toQ11464qPU',
        thumbnail: 'https://img.youtube.com/vi/toQ11464qPU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(43, 33),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2020-09-15'),
      },
      // 124번 뉴스
      {
        title: '토스에서 이용자 몰래 결제 사고…8명 9백만 원 피해',
        category: Category.ECONOMY,
        tags: [tag124_1, tag124_2, tag124_3],
        scripts: [script124_1, script124_2, script124_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'UPOLC09G9pY',
        thumbnail: 'https://img.youtube.com/vi/UPOLC09G9pY/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(31, 69),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2020-06-09'),
      },
      // 125번 뉴스
      {
        title: '카드에 \'카드 번호\'가 없네?',
        category: Category.ECONOMY,
        tags: [tag125_1, tag125_2, tag125_3],
        scripts: [script125_1, script125_2, script125_3, script125_4, script125_5, script125_6, script125_7, script125_8, script125_9],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'C2sW781ozwE',
        thumbnail: 'https://img.youtube.com/vi/C2sW781ozwE/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(60, 17),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-10-14'),
      },
      // 126번 뉴스
      {
        title: '영화 \'헤어질 결심\', 조연 배우 현장 사진 공개',
        category: Category.ENTERTAINMENT,
        tags: [tag126_1, tag126_2, tag126_3],
        scripts: [script126_1, script126_2, script126_3, script126_4,
          script126_5, script126_6, script126_7, script126_8],
        announcerGender: Gender.MEN,
        channel: Channel.MBC,
        link: '1AcXHGxe43o',
        thumbnail: 'https://img.youtube.com/vi/1AcXHGxe43o/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(46, 98),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-23'),
      },
      // 127번 뉴스
      {
        title: '장외 정치 · 출마 좌절…낙동강 오리알 된 \'청년 대표\'',
        category: Category.POLITICS,
        tags: [tag127_1, tag127_2, tag127_3],
        scripts: [script127_1, script127_2, script127_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'sPOBZDURmO0',
        thumbnail: 'https://img.youtube.com/vi/sPOBZDURmO0/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(21, 69),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-18'),
      },
      // 128번 뉴스
      {
        title: '수학여행 다녀온 전주 고교 \'비상\'…159명 확진',
        category: Category.SOCIETY,
        tags: [tag128_1, tag128_2, tag128_3],
        scripts: [script128_1, script128_2, script128_3, script128_4, script128_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'LfwQ-I27km8',
        thumbnail: 'https://img.youtube.com/vi/LfwQ-I27km8/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(26, 32),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-20'),
      },
      // 129번 뉴스
      {
        title: '수백 명이 마약에 취했다?…마을 덮친 수상한 연기 정체',
        category: Category.WORLD,
        tags: [tag129_1, tag129_2, tag129_3],
        scripts: [script129_1, script129_2, script129_3, script129_4, script129_5,
          ,script129_6, script129_7, script129_8, script129_9, script129_10, script129_11],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'ySqnVuGdvr8',
        thumbnail: 'https://img.youtube.com/vi/ySqnVuGdvr8/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(81, 36),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-19'),
      },
      // 130번 뉴스
      {
        title: 'MZ 토크 이재명, 야구장 간 윤석열… \'2030 올인\'',
        category: Category.POLITICS,
        tags: [tag130_1, tag130_2, tag130_3],
        scripts: [script130_1, script130_2, script130_3, script130_4, script130_5, script130_6],
        announcerGender: Gender.WOMEN,
        channel: Channel.ETC,
        link: 'u8uRoH7TYC0',
        thumbnail: 'https://img.youtube.com/vi/u8uRoH7TYC0/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(37, 82),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-11-14'),
      },
      // 131번 뉴스
      {
        title: '러시아발 천연가스 대란 올겨울 한국도 덮치나?',
        category: Category.WORLD,
        tags: [tag131_1, tag131_2, tag131_3],
        scripts: [script131_1, script131_2, script131_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'j7yNMlh2Sp4',
        thumbnail: 'https://img.youtube.com/vi/j7yNMlh2Sp4/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(22, 6),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-18'),
      },
      // 132번 뉴스
      {
        title: '군, 미국 주도 사이버 연합훈련 참가 예정',
        category: Category.SOCIETY,
        tags: [tag132_1, tag132_2, tag132_3],
        scripts: [script132_1, script132_2, script132_3, script132_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: '-lqQlwdkZzw',
        thumbnail: 'https://img.youtube.com/vi/-lqQlwdkZzw/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(32, 75),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-27'),
      },
      // 133번 뉴스
      {
        title: '\'채식 급식\' 도입…서울 학교 매달 두 차례 실시',
        category: Category.SOCIETY,
        tags: [tag133_1, tag133_2, tag133_3],
        scripts: [script133_1, script133_2, script133_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'MJQsaD32zGw',
        thumbnail: 'https://img.youtube.com/vi/MJQsaD32zGw/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(21, 97),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-04-08'),
      },
      // 134번 뉴스
      {
        title: '내일 판문점서 남북 고위급회담…평양 공동선언 이행 논의',
        category: Category.POLITICS,
        tags: [tag134_1, tag134_2, tag134_3],
        scripts: [script134_1, script134_2, script134_3, script134_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: '9901qqBMsgk',
        thumbnail: 'https://img.youtube.com/vi/9901qqBMsgk/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(39, 92),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2018-10-14'),
      },
      // 135번 뉴스
      {
        title: '바이든, 사우디 도착…빈 살만 왕세자와 \'주먹 인사\'',
        category: Category.WORLD,
        tags: [tag135_1, tag135_2, tag135_3],
        scripts: [script135_1, script135_2, script135_3, script135_4],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'YSdbKJczfJY',
        thumbnail: 'https://youtu.be/YSdbKJczfJY',
        startTime: new Time(0, 0),
        endTime: new Time(37, 23),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-16'),
      },
      // 136번 뉴스
      {
        title: '"넌 이런 사람”…MBTI \'과몰입\'하지 마세요',
        category: Category.SOCIETY,
        tags: [tag136_1, tag136_2, tag136_3],
        scripts: [script136_1, script136_2, script136_3, script136_4, script136_5, script136_6, script136_7],        
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: '_EBrfA6IXqc',
        thumbnail: 'https://img.youtube.com/vi/_EBrfA6IXqc/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(43, 62),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-12'),
      },
      // 137번 뉴스
      {
        title: '"캠퍼스에 소녀상을!"…독일 대학에 소녀상 영구설치',
        category: Category.WORLD,
        tags: [tag137_1, tag137_2, tag137_3],
        scripts: [script137_1, script137_2, script137_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'iLCagGpMs-A',
        thumbnail: 'https://img.youtube.com/vi/iLCagGpMs-A/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(19, 68),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-09'),
      },
      // 138번 뉴스
      {
        title: '코로나에 전쟁에 못살겠다‥"대통령은 집에 가라"',
        category: Category.WORLD,
        tags: [tag138_1, tag138_2, tag138_3],
        scripts: [script138_1, script138_2, script138_3, script138_4, script138_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'CVoXcVrUjX8',
        thumbnail: 'https://img.youtube.com/vi/CVoXcVrUjX8/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(24, 98),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-04-01'),
      },
      // 139번 뉴스
      {
        title: '다시 고개 드는 \'핵전쟁\' 공포',
        category: Category.WORLD,
        tags: [tag139_1, tag139_2, tag139_3],
        scripts: [script139_1, script139_2, script139_3, script139_4, script139_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'N6RydzczvPo',
        thumbnail: 'https://img.youtube.com/vi/N6RydzczvPo/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(36, 68),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-04-30'),
      },
      // 140번 뉴스
      {
        title: '3년 만에 열린 \'퀴어 축제\'‥길 건너선 \'반대 집회\'',
        category: Category.SOCIETY,
        tags: [tag140_1, tag140_2, tag140_3],
        scripts: [script140_1, script140_2, script140_3, script140_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'FSPJA4NVwyU',
        thumbnail: 'https://img.youtube.com/vi/FSPJA4NVwyU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(20, 36),
        suitability: Suitability.MEDIUM,
        isEmbeddable: true,
        reportDate: new Date('2022-07-16'),
      }                                                                                                                                                                                     
    ];

    const news = newsRepository.create(newsInfo);
    const news2 = await newsRepository.save(news);
    
    for (let i in news2) {
      // console.log(i);
      const news3 = await newsRepository.find({
        relations: ['tags'],
        where: {
          id: news2[i].id,
        },
      });
      console.log(news3);
    }
};
// insertNewsData();
// 
