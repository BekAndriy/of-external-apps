const fs = require('fs');
const path = require('path');

const RSIByTickers = [
  ['AAPL', { results: { underlying: { url: 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/1634788800000/1643673600000?limit=165\u0026sort=asc' }, values: [{ timestamp: 1641186000000, value: 61.82266009852212 }, { timestamp: 1641272400000, value: 57.424435742883496 }, { timestamp: 1641358800000, value: 49.566342701733134 }, { timestamp: 1641445200000, value: 45.4726924255952 }, { timestamp: 1641531600000, value: 45.753588474286694 }, { timestamp: 1641790800000, value: 45.788970686856494 }, { timestamp: 1641877200000, value: 50.78436313415607 }, { timestamp: 1641963600000, value: 51.533265280890646 }, { timestamp: 1642050000000, value: 45.94497884505451 }, { timestamp: 1642136400000, value: 47.55854443307774 }, { timestamp: 1642482000000, value: 42.48370057228029 }, { timestamp: 1642568400000, value: 37.7479129103922 }, { timestamp: 1642654800000, value: 35.68401365871546 }, { timestamp: 1642741200000, value: 33.29072885151433 }, { timestamp: 1643000400000, value: 32.41009876023671 }, { timestamp: 1643086800000, value: 30.393470164307658 }, { timestamp: 1643173200000, value: 30.294178197753922 }, { timestamp: 1643259600000, value: 29.747632767617418 }, { timestamp: 1643346000000, value: 51.85786563665905 }, { timestamp: 1643605200000, value: 57.612302338142776 }] }, status: 'OK', request_id: '73ec29c0b2ca99bdfc96ca6be5ea2b88' }],
  ['SBUX', { results: { underlying: { url: 'https://api.polygon.io/v2/aggs/ticker/SBUX/range/1/day/1634788800000/1643673600000?limit=165\u0026sort=asc' }, values: [{ timestamp: 1641186000000, value: 56.12943372744249 }, { timestamp: 1641272400000, value: 48.24124737729872 }, { timestamp: 1641358800000, value: 39.03951893994689 }, { timestamp: 1641445200000, value: 41.262153337675116 }, { timestamp: 1641531600000, value: 34.377939549775874 }, { timestamp: 1641790800000, value: 31.905079811901842 }, { timestamp: 1641877200000, value: 29.00196565935684 }, { timestamp: 1641963600000, value: 28.76120150372077 }, { timestamp: 1642050000000, value: 26.697318228433588 }, { timestamp: 1642136400000, value: 23.83983583573071 }, { timestamp: 1642482000000, value: 21.269863940938933 }, { timestamp: 1642568400000, value: 20.4169575419303 }, { timestamp: 1642654800000, value: 19.30232830256419 }, { timestamp: 1642741200000, value: 21.66516228614485 }, { timestamp: 1643000400000, value: 28.504824344504215 }, { timestamp: 1643086800000, value: 26.961080834010076 }, { timestamp: 1643173200000, value: 25.044761427245632 }, { timestamp: 1643259600000, value: 24.70099220485959 }, { timestamp: 1643346000000, value: 32.00711096233108 }, { timestamp: 1643605200000, value: 35.93845234635202 }] }, status: 'OK', request_id: 'ff141de5b4a2025c5a235ccc8e7be922' }],
  ['GME', { results: { underlying: { url: 'https://api.polygon.io/v2/aggs/ticker/GME/range/1/day/1634788800000/1643673600000?limit=165\u0026sort=asc' }, values: [{ timestamp: 1641186000000, value: 55.1142005958292 }, { timestamp: 1641272400000, value: 50.840649971109265 }, { timestamp: 1641358800000, value: 35.92508186988913 }, { timestamp: 1641445200000, value: 37.59995464256373 }, { timestamp: 1641531600000, value: 46.32834139624806 }, { timestamp: 1641790800000, value: 40.32925242357963 }, { timestamp: 1641877200000, value: 39.83070080729438 }, { timestamp: 1641963600000, value: 38.48066195466359 }, { timestamp: 1642050000000, value: 35.2733182635134 }, { timestamp: 1642136400000, value: 32.24893145931479 }, { timestamp: 1642482000000, value: 28.72730713821379 }, { timestamp: 1642568400000, value: 27.741006115385105 }, { timestamp: 1642654800000, value: 26.130732828619983 }, { timestamp: 1642741200000, value: 30.255808026160807 }, { timestamp: 1643000400000, value: 27.475089022148964 }, { timestamp: 1643086800000, value: 27.318342368998415 }, { timestamp: 1643173200000, value: 31.381927302180458 }, { timestamp: 1643259600000, value: 26.844997576488595 }, { timestamp: 1643346000000, value: 31.641918431799212 }, { timestamp: 1643605200000, value: 41.93478454325491 }] }, status: 'OK', request_id: '50cd02ae29ee53058e49a18f24b463b7' }],
  ['AMC', { results: { underlying: { url: 'https://api.polygon.io/v2/aggs/ticker/AMC/range/1/day/1634788800000/1643673600000?limit=165\u0026sort=asc' }, values: [{ timestamp: 1641186000000, value: 57.89062499999999 }, { timestamp: 1641272400000, value: 53.27397411790731 }, { timestamp: 1641358800000, value: 43.366346919693875 }, { timestamp: 1641445200000, value: 42.46616614313595 }, { timestamp: 1641531600000, value: 44.72441998643371 }, { timestamp: 1641790800000, value: 43.987689398549676 }, { timestamp: 1641877200000, value: 44.0349659886732 }, { timestamp: 1641963600000, value: 43.75655364337993 }, { timestamp: 1642050000000, value: 36.452387187963865 }, { timestamp: 1642136400000, value: 36.16832338131271 }, { timestamp: 1642482000000, value: 31.14424892527471 }, { timestamp: 1642568400000, value: 29.804121960775646 }, { timestamp: 1642654800000, value: 29.154596079154203 }, { timestamp: 1642741200000, value: 28.883443479616034 }, { timestamp: 1643000400000, value: 25.488121971483906 }, { timestamp: 1643086800000, value: 24.067780678711003 }, { timestamp: 1643173200000, value: 23.88284364277095 }, { timestamp: 1643259600000, value: 20.824136543986924 }, { timestamp: 1643346000000, value: 24.7699219901278 }, { timestamp: 1643605200000, value: 31.57091480413797 }] }, status: 'OK', request_id: '57d90729db91d515a8a856ef9d8f6f29' }],
  ['HOOD', { results: { underlying: { url: 'https://api.polygon.io/v2/aggs/ticker/HOOD/range/1/day/1634788800000/1643673600000?limit=165\u0026sort=asc' }, values: [{ timestamp: 1641186000000, value: 46.454265159301144 }, { timestamp: 1641272400000, value: 41.6589861751152 }, { timestamp: 1641358800000, value: 36.169074371321564 }, { timestamp: 1641445200000, value: 34.77871664867102 }, { timestamp: 1641531600000, value: 36.80616706798415 }, { timestamp: 1641790800000, value: 35.7259145715242 }, { timestamp: 1641877200000, value: 41.049551603123085 }, { timestamp: 1641963600000, value: 40.33007570827713 }, { timestamp: 1642050000000, value: 36.26571385128239 }, { timestamp: 1642136400000, value: 35.73499864662304 }, { timestamp: 1642482000000, value: 32.68406076660783 }, { timestamp: 1642568400000, value: 30.8079172028001 }, { timestamp: 1642654800000, value: 30.078738165861907 }, { timestamp: 1642741200000, value: 27.582855857782832 }, { timestamp: 1643000400000, value: 28.836789040976456 }, { timestamp: 1643086800000, value: 28.570407501783876 }, { timestamp: 1643173200000, value: 26.188451873994183 }, { timestamp: 1643259600000, value: 23.545879745107186 }, { timestamp: 1643346000000, value: 33.64136476760402 }, { timestamp: 1643605200000, value: 43.77787681647774 }] }, status: 'OK', request_id: '1bc3a50e6b385323a1331b77c6b6f3dc' }],
  ['CSWC', { results: { underlying: { url: 'https://api.polygon.io/v2/aggs/ticker/CSWC/range/1/day/1634788800000/1643673600000?limit=165\u0026sort=asc' }, values: [{ timestamp: 1641186000000, value: 56.30252100840336 }, { timestamp: 1641272400000, value: 52.948328267477244 }, { timestamp: 1641358800000, value: 44.86192369154376 }, { timestamp: 1641445200000, value: 46.93296491953657 }, { timestamp: 1641531600000, value: 48.85405760950794 }, { timestamp: 1641790800000, value: 46.22044122907519 }, { timestamp: 1641877200000, value: 51.01045077203064 }, { timestamp: 1641963600000, value: 53.51833799250028 }, { timestamp: 1642050000000, value: 50.5752171493466 }, { timestamp: 1642136400000, value: 45.47264371337808 }, { timestamp: 1642482000000, value: 51.86482290084886 }, { timestamp: 1642568400000, value: 45.58649562067451 }, { timestamp: 1642654800000, value: 41.7328525623545 }, { timestamp: 1642741200000, value: 35.62755257694673 }, { timestamp: 1643000400000, value: 35.453003852338526 }, { timestamp: 1643086800000, value: 44.65177156280111 }, { timestamp: 1643173200000, value: 44.114432454248956 }, { timestamp: 1643259600000, value: 42.25265666915433 }, { timestamp: 1643346000000, value: 46.40776463704853 }, { timestamp: 1643605200000, value: 53.16543821993682 }] }, status: 'OK', request_id: '1cc9955821673cedc8b4060e2081ed16' }],
  ['ATCO', { results: { underlying: { url: 'https://api.polygon.io/v2/aggs/ticker/ATCO/range/1/day/1634788800000/1643673600000?limit=165\u0026sort=asc' }, values: [{ timestamp: 1641186000000, value: 86.9565217391305 }, { timestamp: 1641272400000, value: 88.56304985337248 }, { timestamp: 1641358800000, value: 71.87843280849512 }, { timestamp: 1641445200000, value: 69.20406779661016 }, { timestamp: 1641531600000, value: 73.68527064628196 }, { timestamp: 1641790800000, value: 75.06440927254455 }, { timestamp: 1641877200000, value: 78.84536494681188 }, { timestamp: 1641963600000, value: 80.2062782373619 }, { timestamp: 1642050000000, value: 83.12844342409016 }, { timestamp: 1642136400000, value: 83.77339864136732 }, { timestamp: 1642482000000, value: 76.24059558456811 }, { timestamp: 1642568400000, value: 59.078023525567396 }, { timestamp: 1642654800000, value: 54.66093053067851 }, { timestamp: 1642741200000, value: 42.42134061008546 }, { timestamp: 1643000400000, value: 41.040418739009006 }, { timestamp: 1643086800000, value: 39.6504113788545 }, { timestamp: 1643173200000, value: 42.113685201875406 }, { timestamp: 1643259600000, value: 48.57246826174994 }, { timestamp: 1643346000000, value: 58.33505495569651 }, { timestamp: 1643605200000, value: 60.01196345649061 }] }, status: 'OK', request_id: '200f268dc26ef508ac1e9b2cef254d15' }],
  ['ATVI', { results: { underlying: { url: 'https://api.polygon.io/v2/aggs/ticker/ATVI/range/1/day/1634788800000/1643673600000?limit=165\u0026sort=asc' }, values: [{ timestamp: 1641186000000, value: 89.18650793650797 }, { timestamp: 1641272400000, value: 87.13838353713096 }, { timestamp: 1641358800000, value: 79.05167748917754 }, { timestamp: 1641445200000, value: 62.18321273042794 }, { timestamp: 1641531600000, value: 62.941720667247274 }, { timestamp: 1641790800000, value: 57.67535816029923 }, { timestamp: 1641877200000, value: 66.55435679211661 }, { timestamp: 1641963600000, value: 61.29800417647644 }, { timestamp: 1642050000000, value: 58.249201644536946 }, { timestamp: 1642136400000, value: 62.11722660761299 }, { timestamp: 1642482000000, value: 84.10773974931612 }, { timestamp: 1642568400000, value: 83.61345854910063 }, { timestamp: 1642654800000, value: 82.34319120876343 }, { timestamp: 1642741200000, value: 80.95085436926549 }, { timestamp: 1643000400000, value: 76.27583409497161 }, { timestamp: 1643086800000, value: 73.46168270755643 }, { timestamp: 1643173200000, value: 72.31242326340647 }, { timestamp: 1643259600000, value: 72.47608772517884 }, { timestamp: 1643346000000, value: 72.82210669419408 }, { timestamp: 1643605200000, value: 72.29195941983664 }] }, status: 'OK', request_id: '49996e544cff384d1da1fd3b8bcf5db6' }],
  ['MSFT', { results: { underlying: { url: 'https://api.polygon.io/v2/aggs/ticker/MSFT/range/1/day/1634788800000/1643673600000?limit=165\u0026sort=asc' }, values: [{ timestamp: 1641186000000, value: 56.082748149554035 }, { timestamp: 1641272400000, value: 50.19403394614089 }, { timestamp: 1641358800000, value: 40.19350056379313 }, { timestamp: 1641445200000, value: 38.55598944329029 }, { timestamp: 1641531600000, value: 38.72803951582097 }, { timestamp: 1641790800000, value: 38.99249410762887 }, { timestamp: 1641877200000, value: 39.8554739250419 }, { timestamp: 1641963600000, value: 43.82110913339738 }, { timestamp: 1642050000000, value: 33.95093570076084 }, { timestamp: 1642136400000, value: 39.80444962042142 }, { timestamp: 1642482000000, value: 35.118250544355675 }, { timestamp: 1642568400000, value: 35.85078340639437 }, { timestamp: 1642654800000, value: 34.77507512667901 }, { timestamp: 1642741200000, value: 31.498094197073883 }, { timestamp: 1643000400000, value: 31.919824597599344 }, { timestamp: 1643086800000, value: 27.66828287746371 }, { timestamp: 1643173200000, value: 37.082565614647336 }, { timestamp: 1643259600000, value: 40.27046634626499 }, { timestamp: 1643346000000, value: 47.915735163635 }, { timestamp: 1643605200000, value: 50.13613443101758 }] }, status: 'OK', request_id: '023f84ff8a047689fa6fb9e1270e2e6f' }],
  ['SONY', { results: { underlying: { url: 'https://api.polygon.io/v2/aggs/ticker/SONY/range/1/day/1634788800000/1643673600000?limit=165\u0026sort=asc' }, values: [{ timestamp: 1641186000000, value: 65.0212314225053 }, { timestamp: 1641272400000, value: 69.06996895082678 }, { timestamp: 1641358800000, value: 69.12039527313662 }, { timestamp: 1641445200000, value: 52.33553896941339 }, { timestamp: 1641531600000, value: 54.91724749698785 }, { timestamp: 1641790800000, value: 52.03383581511391 }, { timestamp: 1641877200000, value: 58.51534008849041 }, { timestamp: 1641963600000, value: 60.04727206649099 }, { timestamp: 1642050000000, value: 53.97037554647858 }, { timestamp: 1642136400000, value: 53.94535715104319 }, { timestamp: 1642482000000, value: 37.28601888899762 }, { timestamp: 1642568400000, value: 30.67488116786673 }, { timestamp: 1642654800000, value: 38.00238886407078 }, { timestamp: 1642741200000, value: 35.73620902902091 }, { timestamp: 1643000400000, value: 34.52774729429146 }, { timestamp: 1643086800000, value: 33.82703738090194 }, { timestamp: 1643173200000, value: 34.08263425588595 }, { timestamp: 1643259600000, value: 26.90078071380836 }, { timestamp: 1643346000000, value: 34.98781194904265 }, { timestamp: 1643605200000, value: 43.38828006821024 }] }, status: 'OK', request_id: 'a81c6b7b0446893a064866bde5481cec' }],
  ['TSLA', { results: { underlying: { url: 'https://api.polygon.io/v2/aggs/ticker/TSLA/range/1/day/1634788800000/1643673600000?limit=165\u0026sort=asc' }, values: [{ timestamp: 1641186000000, value: 75.18526451865046 }, { timestamp: 1641272400000, value: 67.56142874930062 }, { timestamp: 1641358800000, value: 59.59147766926569 }, { timestamp: 1641445200000, value: 56.84027118062295 }, { timestamp: 1641531600000, value: 52.62407022584849 }, { timestamp: 1641790800000, value: 55.555407053779845 }, { timestamp: 1641877200000, value: 56.144348493853464 }, { timestamp: 1641963600000, value: 59.95034146789674 }, { timestamp: 1642050000000, value: 51.37784150465356 }, { timestamp: 1642136400000, value: 53.12306390017664 }, { timestamp: 1642482000000, value: 51.03554686783462 }, { timestamp: 1642568400000, value: 47.37635656643812 }, { timestamp: 1642654800000, value: 47.448536432368286 }, { timestamp: 1642741200000, value: 42.18584113582331 }, { timestamp: 1643000400000, value: 40.889526448708985 }, { timestamp: 1643086800000, value: 39.79062380766634 }, { timestamp: 1643173200000, value: 42.51704874389505 }, { timestamp: 1643259600000, value: 33.27254045565117 }, { timestamp: 1643346000000, value: 35.6715363908351 }, { timestamp: 1643605200000, value: 46.51932445245221 }] }, status: 'OK', request_id: '5e788dd83a2a7d0039cc964b4a856e0c' }],
  ['NFLX', { results: { underlying: { url: 'https://api.polygon.io/v2/aggs/ticker/NFLX/range/1/day/1634788800000/1643673600000?limit=165\u0026sort=asc' }, values: [{ timestamp: 1641186000000, value: 49.57440966501921 }, { timestamp: 1641272400000, value: 45.39941972920695 }, { timestamp: 1641358800000, value: 33.76543974929011 }, { timestamp: 1641445200000, value: 28.95364477882599 }, { timestamp: 1641531600000, value: 25.579710840834196 }, { timestamp: 1641790800000, value: 25.266011490800608 }, { timestamp: 1641877200000, value: 26.06493091209785 }, { timestamp: 1641963600000, value: 25.012019958608604 }, { timestamp: 1642050000000, value: 20.559730575257845 }, { timestamp: 1642136400000, value: 25.690180107743757 }, { timestamp: 1642482000000, value: 22.15493257081549 }, { timestamp: 1642568400000, value: 25.887311669907405 }, { timestamp: 1642654800000, value: 24.021875534193114 }, { timestamp: 1642741200000, value: 11.28119948465897 }, { timestamp: 1643000400000, value: 10.70953967143987 }, { timestamp: 1643086800000, value: 9.654309418779306 }, { timestamp: 1643173200000, value: 9.333265316824964 }, { timestamp: 1643259600000, value: 20.738057314876784 }, { timestamp: 1643346000000, value: 20.497413210238065 }, { timestamp: 1643605200000, value: 35.28290507142651 }] }, status: 'OK', request_id: '5f2376c266fef9d3ea9fe31a6aefde5b' }],
  ['SHOP', { results: { underlying: { url: 'https://api.polygon.io/v2/aggs/ticker/SHOP/range/1/day/1634788800000/1643673600000?limit=165\u0026sort=asc' }, values: [{ timestamp: 1641186000000, value: 51.17102828443034 }, { timestamp: 1641272400000, value: 36.49370198178027 }, { timestamp: 1641358800000, value: 34.117857598 }, { timestamp: 1641445200000, value: 32.604893211076515 }, { timestamp: 1641531600000, value: 30.89365979143156 }, { timestamp: 1641790800000, value: 29.971473954560636 }, { timestamp: 1641877200000, value: 34.1300858979032 }, { timestamp: 1641963600000, value: 35.925011831926014 }, { timestamp: 1642050000000, value: 28.34161579686122 }, { timestamp: 1642136400000, value: 33.89089601187197 }, { timestamp: 1642482000000, value: 30.687645985982485 }, { timestamp: 1642568400000, value: 29.22582726253532 }, { timestamp: 1642654800000, value: 28.78979394951415 }, { timestamp: 1642741200000, value: 21.71925488776509 }, { timestamp: 1643000400000, value: 29.165284181912014 }, { timestamp: 1643086800000, value: 26.910863322749705 }, { timestamp: 1643173200000, value: 25.816738176452333 }, { timestamp: 1643259600000, value: 23.487408126594673 }, { timestamp: 1643346000000, value: 30.645866561704437 }, { timestamp: 1643605200000, value: 40.42600968702693 }] }, status: 'OK', request_id: 'a3abfa543f97873be710ef6157298736' }],
  ['SQ', { results: { underlying: { url: 'https://api.polygon.io/v2/aggs/ticker/SQ/range/1/day/1634788800000/1643673600000?limit=165\u0026sort=asc' }, values: [{ timestamp: 1641186000000, value: 43.77905895480752 }, { timestamp: 1641272400000, value: 37.92962407506106 }, { timestamp: 1641358800000, value: 30.589834658062927 }, { timestamp: 1641445200000, value: 31.88332743491047 }, { timestamp: 1641531600000, value: 30.26369559960402 }, { timestamp: 1641790800000, value: 33.68238005031861 }, { timestamp: 1641877200000, value: 38.0747820478029 }, { timestamp: 1641963600000, value: 36.14292180147007 }, { timestamp: 1642050000000, value: 31.230948271236485 }, { timestamp: 1642136400000, value: 29.38353933371394 }, { timestamp: 1642482000000, value: 27.792070049562355 }, { timestamp: 1642568400000, value: 26.904859667659736 }, { timestamp: 1642654800000, value: 26.62923117284477 }, { timestamp: 1642741200000, value: 22.43848052928999 }, { timestamp: 1643000400000, value: 22.122088416005866 }, { timestamp: 1643086800000, value: 21.31299013069858 }, { timestamp: 1643173200000, value: 19.649042363362156 }, { timestamp: 1643259600000, value: 17.78509939640483 }, { timestamp: 1643346000000, value: 24.597140818167958 }, { timestamp: 1643605200000, value: 38.40666115939849 }] }, status: 'OK', request_id: '74c2f98fcef3a60095132be322de435b' }],

  ['MRNA', {
    results: {
      underlying: {
        url: 'https://api.polygon.io/v2/aggs/ticker/MRNA/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
      },
      values: [
        {
          timestamp: 1641186000000,
          value: 29.945709115153804
        },
        {
          timestamp: 1641272400000,
          value: 29.34667882504145
        },
        {
          timestamp: 1641358800000,
          value: 24.598695288046315
        },
        {
          timestamp: 1641445200000,
          value: 25.20533702642713
        },
        {
          timestamp: 1641531600000,
          value: 24.639470417259687
        },
        {
          timestamp: 1641790800000,
          value: 38.12939679251626
        },
        {
          timestamp: 1641877200000,
          value: 34.05596962157118
        },
        {
          timestamp: 1641963600000,
          value: 34.96765983498341
        },
        {
          timestamp: 1642050000000,
          value: 31.047698735252197
        },
        {
          timestamp: 1642136400000,
          value: 29.52337349433286
        },
        {
          timestamp: 1642482000000,
          value: 25.10249056029916
        },
        {
          timestamp: 1642568400000,
          value: 22.582290328209083
        },
        {
          timestamp: 1642654800000,
          value: 21.37515501557708
        },
        {
          timestamp: 1642741200000,
          value: 20.06158602194671
        },
        {
          timestamp: 1643000400000,
          value: 19.579793665113854
        },
        {
          timestamp: 1643086800000,
          value: 18.746631111611535
        },
        {
          timestamp: 1643173200000,
          value: 20.596555885591783
        },
        {
          timestamp: 1643259600000,
          value: 19.353392066571786
        },
        {
          timestamp: 1643346000000,
          value: 27.426436943455855
        },
        {
          timestamp: 1643605200000,
          value: 33.90191720972315
        }
      ]
    },
    status: 'OK',
    request_id: '004f03a765038d498972a61ebcd4a75d'
  }],
  ['BNTX', {
    results: {
      underlying: {
        url: 'https://api.polygon.io/v2/aggs/ticker/BNTX/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
      },
      values: [
        {
          timestamp: 1641186000000,
          value: 29.02110965813563
        },
        {
          timestamp: 1641272400000,
          value: 26.919795790511984
        },
        {
          timestamp: 1641358800000,
          value: 23.881716410103877
        },
        {
          timestamp: 1641445200000,
          value: 26.225997443977235
        },
        {
          timestamp: 1641531600000,
          value: 25.48542548586171
        },
        {
          timestamp: 1641790800000,
          value: 37.40538432515559
        },
        {
          timestamp: 1641877200000,
          value: 32.96479065560014
        },
        {
          timestamp: 1641963600000,
          value: 35.891159952174434
        },
        {
          timestamp: 1642050000000,
          value: 30.78686393942027
        },
        {
          timestamp: 1642136400000,
          value: 29.047647361696903
        },
        {
          timestamp: 1642482000000,
          value: 23.558634922846835
        },
        {
          timestamp: 1642568400000,
          value: 22.27669910568487
        },
        {
          timestamp: 1642654800000,
          value: 21.425835222831537
        },
        {
          timestamp: 1642741200000,
          value: 19.979251627855305
        },
        {
          timestamp: 1643000400000,
          value: 22.16038699615018
        },
        {
          timestamp: 1643086800000,
          value: 25.617456222994292
        },
        {
          timestamp: 1643173200000,
          value: 28.239896724407956
        },
        {
          timestamp: 1643259600000,
          value: 26.75361742470683
        },
        {
          timestamp: 1643346000000,
          value: 31.58793540889137
        },
        {
          timestamp: 1643605200000,
          value: 37.30873149757841
        }
      ]
    },
    status: 'OK',
    request_id: '7af1ff11af309325d2babc75a44aa3e1'
  }],
  ['COIN', {
    results: {
      underlying: {
        url: 'https://api.polygon.io/v2/aggs/ticker/COIN/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
      },
      values: [
        {
          timestamp: 1641186000000,
          value: 47.653887425617015
        },
        {
          timestamp: 1641272400000,
          value: 47.20754071794414
        },
        {
          timestamp: 1641358800000,
          value: 40.05981082388609
        },
        {
          timestamp: 1641445200000,
          value: 39.965662362452555
        },
        {
          timestamp: 1641531600000,
          value: 39.24446184498731
        },
        {
          timestamp: 1641790800000,
          value: 36.1639416010688
        },
        {
          timestamp: 1641877200000,
          value: 44.058448433024104
        },
        {
          timestamp: 1641963600000,
          value: 42.8761987252389
        },
        {
          timestamp: 1642050000000,
          value: 39.925664780728205
        },
        {
          timestamp: 1642136400000,
          value: 41.139230180805136
        },
        {
          timestamp: 1642482000000,
          value: 37.499819135230204
        },
        {
          timestamp: 1642568400000,
          value: 36.419582123350345
        },
        {
          timestamp: 1642654800000,
          value: 38.04931537292934
        },
        {
          timestamp: 1642741200000,
          value: 27.451211282643683
        },
        {
          timestamp: 1643000400000,
          value: 27.315801094607394
        },
        {
          timestamp: 1643086800000,
          value: 25.686719131867875
        },
        {
          timestamp: 1643173200000,
          value: 23.855957355832743
        },
        {
          timestamp: 1643259600000,
          value: 21.83257433590545
        },
        {
          timestamp: 1643346000000,
          value: 27.613993619191476
        },
        {
          timestamp: 1643605200000,
          value: 36.261205524665016
        }
      ]
    },
    status: 'OK',
    request_id: '5485463272c86c014aca70489618e81c'
  }],
  ['RCI', {
    results: {
      underlying: {
        url: 'https://api.polygon.io/v2/aggs/ticker/RCI/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
      },
      values: [
        {
          timestamp: 1641186000000,
          value: 81.29496402877696
        },
        {
          timestamp: 1641272400000,
          value: 82.12585933368587
        },
        {
          timestamp: 1641358800000,
          value: 83.92066454422365
        },
        {
          timestamp: 1641445200000,
          value: 79.42192712861217
        },
        {
          timestamp: 1641531600000,
          value: 82.30140767206382
        },
        {
          timestamp: 1641790800000,
          value: 82.3443204746371
        },
        {
          timestamp: 1641877200000,
          value: 84.59666862765715
        },
        {
          timestamp: 1641963600000,
          value: 82.17741466540105
        },
        {
          timestamp: 1642050000000,
          value: 82.57978654244923
        },
        {
          timestamp: 1642136400000,
          value: 82.90309321948011
        },
        {
          timestamp: 1642482000000,
          value: 86.36740127091244
        },
        {
          timestamp: 1642568400000,
          value: 76.43484781675089
        },
        {
          timestamp: 1642654800000,
          value: 68.15332394447518
        },
        {
          timestamp: 1642741200000,
          value: 59.82976298568606
        },
        {
          timestamp: 1643000400000,
          value: 53.88559415664475
        },
        {
          timestamp: 1643086800000,
          value: 59.691264915360826
        },
        {
          timestamp: 1643173200000,
          value: 59.57587367301881
        },
        {
          timestamp: 1643259600000,
          value: 68.54671745245336
        },
        {
          timestamp: 1643346000000,
          value: 73.05851434990659
        },
        {
          timestamp: 1643605200000,
          value: 69.16322014377262
        }
      ]
    },
    status: 'OK',
    request_id: '15c3a12ffce27f6490d6bda967b44455'
  }],
  ['ENPH', {
    results: {
      underlying: {
        url: 'https://api.polygon.io/v2/aggs/ticker/ENPH/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
      },
      values: [
        {
          timestamp: 1641186000000,
          value: 31.558307533539747
        },
        {
          timestamp: 1641272400000,
          value: 27.752258352763803
        },
        {
          timestamp: 1641358800000,
          value: 19.22244613607269
        },
        {
          timestamp: 1641445200000,
          value: 17.64079907385114
        },
        {
          timestamp: 1641531600000,
          value: 16.056100407169367
        },
        {
          timestamp: 1641790800000,
          value: 18.534435761504213
        },
        {
          timestamp: 1641877200000,
          value: 20.283291807381175
        },
        {
          timestamp: 1641963600000,
          value: 21.2985097184591
        },
        {
          timestamp: 1642050000000,
          value: 19.307354122623835
        },
        {
          timestamp: 1642136400000,
          value: 19.09157117102214
        },
        {
          timestamp: 1642482000000,
          value: 16.923108602703792
        },
        {
          timestamp: 1642568400000,
          value: 16.53154079511711
        },
        {
          timestamp: 1642654800000,
          value: 16.701926973782918
        },
        {
          timestamp: 1642741200000,
          value: 14.235366756330194
        },
        {
          timestamp: 1643000400000,
          value: 17.38746686563968
        },
        {
          timestamp: 1643086800000,
          value: 15.753692825546366
        },
        {
          timestamp: 1643173200000,
          value: 15.494769318276752
        },
        {
          timestamp: 1643259600000,
          value: 14.970694570076077
        },
        {
          timestamp: 1643346000000,
          value: 21.24011607393591
        },
        {
          timestamp: 1643605200000,
          value: 41.182261340847695
        }
      ]
    },
    status: 'OK',
    request_id: 'e8edf5617c22b08967990d8b880d53b3'
  }],
  ['SEDG', { results: { underlying: { url: 'https://api.polygon.io/v2/aggs/ticker/SEDG/range/1/day/1634788800000/1643673600000?limit=165\u0026sort=asc' }, values: [{ timestamp: 1641186000000, value: 42.2448380467756 }, { timestamp: 1641272400000, value: 38.4556349657729 }, { timestamp: 1641358800000, value: 30.997316950373147 }, { timestamp: 1641445200000, value: 30.566941252275782 }, { timestamp: 1641531600000, value: 31.007179095431397 }, { timestamp: 1641790800000, value: 35.33065699418941 }, { timestamp: 1641877200000, value: 38.865213280087495 }, { timestamp: 1641963600000, value: 38.83674077775395 }, { timestamp: 1642050000000, value: 38.580193366353505 }, { timestamp: 1642136400000, value: 35.736313677916684 }, { timestamp: 1642482000000, value: 30.265046818242396 }, { timestamp: 1642568400000, value: 28.19002872584653 }, { timestamp: 1642654800000, value: 27.953183464011218 }, { timestamp: 1642741200000, value: 24.751019590074122 }, { timestamp: 1643000400000, value: 29.16406183480565 }, { timestamp: 1643086800000, value: 25.37889677743256 }, { timestamp: 1643173200000, value: 26.466959899559242 }, { timestamp: 1643259600000, value: 25.23811655841625 }, { timestamp: 1643346000000, value: 27.139947343981333 }, { timestamp: 1643605200000, value: 44.73577138276358 }] }, status: 'OK', request_id: '74cbbb3a38e0d923eca15ebe5a4aaeab' }],
  [
    'RUN',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/RUN/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 49.902024820378834
          },
          {
            timestamp: 1641272400000,
            value: 46.930964419033224
          },
          {
            timestamp: 1641358800000,
            value: 38.329390041530736
          },
          {
            timestamp: 1641445200000,
            value: 38.560379613302395
          },
          {
            timestamp: 1641531600000,
            value: 39.535944317203345
          },
          {
            timestamp: 1641790800000,
            value: 38.98047746519414
          },
          {
            timestamp: 1641877200000,
            value: 44.09771577707066
          },
          {
            timestamp: 1641963600000,
            value: 46.18634793687672
          },
          {
            timestamp: 1642050000000,
            value: 44.49916681977516
          },
          {
            timestamp: 1642136400000,
            value: 41.34568397560771
          },
          {
            timestamp: 1642482000000,
            value: 33.81989983765169
          },
          {
            timestamp: 1642568400000,
            value: 30.910617852312342
          },
          {
            timestamp: 1642654800000,
            value: 35.5774060408054
          },
          {
            timestamp: 1642741200000,
            value: 29.681366846631505
          },
          {
            timestamp: 1643000400000,
            value: 34.343739791143776
          },
          {
            timestamp: 1643086800000,
            value: 32.770000217027004
          },
          {
            timestamp: 1643173200000,
            value: 29.93240262944788
          },
          {
            timestamp: 1643259600000,
            value: 27.23601993513161
          },
          {
            timestamp: 1643346000000,
            value: 27.912791966341445
          },
          {
            timestamp: 1643605200000,
            value: 38.26074576934331
          }
        ]
      },
      status: 'OK',
      request_id: 'b3753f2ec46ab6d8a80f5993687bf9e5'
    }
  ],
  [
    'TX',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/TX/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 54.84581497797359
          },
          {
            timestamp: 1641272400000,
            value: 60.223880597014954
          },
          {
            timestamp: 1641358800000,
            value: 68.45751848210061
          },
          {
            timestamp: 1641445200000,
            value: 69.25514979739398
          },
          {
            timestamp: 1641531600000,
            value: 69.11572689038292
          },
          {
            timestamp: 1641790800000,
            value: 57.41484055025108
          },
          {
            timestamp: 1641877200000,
            value: 56.26891461760712
          },
          {
            timestamp: 1641963600000,
            value: 63.26277645288792
          },
          {
            timestamp: 1642050000000,
            value: 57.22233149217482
          },
          {
            timestamp: 1642136400000,
            value: 55.47113213401361
          },
          {
            timestamp: 1642482000000,
            value: 51.04871858590287
          },
          {
            timestamp: 1642568400000,
            value: 53.80763983994102
          },
          {
            timestamp: 1642654800000,
            value: 50.72861676433685
          },
          {
            timestamp: 1642741200000,
            value: 39.24187119433648
          },
          {
            timestamp: 1643000400000,
            value: 35.5878825052515
          },
          {
            timestamp: 1643086800000,
            value: 34.74409156288098
          },
          {
            timestamp: 1643173200000,
            value: 40.07484529934045
          },
          {
            timestamp: 1643259600000,
            value: 36.66965503032438
          },
          {
            timestamp: 1643346000000,
            value: 37.2239437938976
          },
          {
            timestamp: 1643605200000,
            value: 34.89190634592629
          }
        ]
      },
      status: 'OK',
      request_id: '876367a0d97b32e2c23b4606709f585f'
    }
  ],
  [
    'WST',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/WST/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 59.39784007854261
          },
          {
            timestamp: 1641272400000,
            value: 49.54885586487376
          },
          {
            timestamp: 1641358800000,
            value: 39.195103407297616
          },
          {
            timestamp: 1641445200000,
            value: 41.18849056844739
          },
          {
            timestamp: 1641531600000,
            value: 35.45446404020841
          },
          {
            timestamp: 1641790800000,
            value: 36.61008557747819
          },
          {
            timestamp: 1641877200000,
            value: 40.39702892217947
          },
          {
            timestamp: 1641963600000,
            value: 41.36733085981056
          },
          {
            timestamp: 1642050000000,
            value: 34.42081837082388
          },
          {
            timestamp: 1642136400000,
            value: 34.11968625544591
          },
          {
            timestamp: 1642482000000,
            value: 31.834244854657996
          },
          {
            timestamp: 1642568400000,
            value: 33.893153659107256
          },
          {
            timestamp: 1642654800000,
            value: 33.28112661985037
          },
          {
            timestamp: 1642741200000,
            value: 31.381440675241976
          },
          {
            timestamp: 1643000400000,
            value: 41.19558393339489
          },
          {
            timestamp: 1643086800000,
            value: 39.213038552651724
          },
          {
            timestamp: 1643173200000,
            value: 39.34098319868956
          },
          {
            timestamp: 1643259600000,
            value: 42.61749863698611
          },
          {
            timestamp: 1643346000000,
            value: 47.87370113839005
          },
          {
            timestamp: 1643605200000,
            value: 47.9800252343546
          }
        ]
      },
      status: 'OK',
      request_id: '32432e5d9d65e030bf6ffb6aa2a35503'
    }
  ],
  [
    'TRTN',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/TRTN/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 81.88976377952753
          },
          {
            timestamp: 1641272400000,
            value: 85.57877813504822
          },
          {
            timestamp: 1641358800000,
            value: 75.35062502722245
          },
          {
            timestamp: 1641445200000,
            value: 77.21013258162444
          },
          {
            timestamp: 1641531600000,
            value: 75.82199171076022
          },
          {
            timestamp: 1641790800000,
            value: 77.25333876070911
          },
          {
            timestamp: 1641877200000,
            value: 81.55100013781829
          },
          {
            timestamp: 1641963600000,
            value: 85.58111773629784
          },
          {
            timestamp: 1642050000000,
            value: 77.29092661672819
          },
          {
            timestamp: 1642136400000,
            value: 78.00437465503663
          },
          {
            timestamp: 1642482000000,
            value: 69.37661730019192
          },
          {
            timestamp: 1642568400000,
            value: 60.01959245736876
          },
          {
            timestamp: 1642654800000,
            value: 55.998462419926724
          },
          {
            timestamp: 1642741200000,
            value: 48.21140926088246
          },
          {
            timestamp: 1643000400000,
            value: 51.76791309932848
          },
          {
            timestamp: 1643086800000,
            value: 48.89728077375604
          },
          {
            timestamp: 1643173200000,
            value: 47.248322085169036
          },
          {
            timestamp: 1643259600000,
            value: 44.962270529269055
          },
          {
            timestamp: 1643346000000,
            value: 48.21720919501633
          },
          {
            timestamp: 1643605200000,
            value: 50.577953610294706
          }
        ]
      },
      status: 'OK',
      request_id: 'bc27e279fa947a75bb9ad6c5bcaf8afb'
    }
  ],
  [
    'TSN',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/TSN/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 66.66666666666666
          },
          {
            timestamp: 1641272400000,
            value: 74.45115521043049
          },
          {
            timestamp: 1641358800000,
            value: 75.09900741028241
          },
          {
            timestamp: 1641445200000,
            value: 78.71557647312353
          },
          {
            timestamp: 1641531600000,
            value: 79.20916784365879
          },
          {
            timestamp: 1641790800000,
            value: 76.51155453346811
          },
          {
            timestamp: 1641877200000,
            value: 77.27555504940142
          },
          {
            timestamp: 1641963600000,
            value: 74.4313019691169
          },
          {
            timestamp: 1642050000000,
            value: 81.81831399427567
          },
          {
            timestamp: 1642136400000,
            value: 83.00081255393397
          },
          {
            timestamp: 1642482000000,
            value: 82.58015938104329
          },
          {
            timestamp: 1642568400000,
            value: 72.57801788067573
          },
          {
            timestamp: 1642654800000,
            value: 56.2368208457222
          },
          {
            timestamp: 1642741200000,
            value: 53.198350748834656
          },
          {
            timestamp: 1643000400000,
            value: 56.62679454923858
          },
          {
            timestamp: 1643086800000,
            value: 54.47791990293888
          },
          {
            timestamp: 1643173200000,
            value: 55.9287761851784
          },
          {
            timestamp: 1643259600000,
            value: 52.452282836437966
          },
          {
            timestamp: 1643346000000,
            value: 58.762005224087844
          },
          {
            timestamp: 1643605200000,
            value: 56.1898508466176
          }
        ]
      },
      status: 'OK',
      request_id: 'dd8b6a0a225c058c8aa9eecf5b088c0c'
    }
  ],
  [
    'VMW',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/VMW/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 77.83357245337164
          },
          {
            timestamp: 1641272400000,
            value: 81.17795895417491
          },
          {
            timestamp: 1641358800000,
            value: 81.7952686732624
          },
          {
            timestamp: 1641445200000,
            value: 76.92718392488842
          },
          {
            timestamp: 1641531600000,
            value: 77.49738506934672
          },
          {
            timestamp: 1641790800000,
            value: 80.64816914129497
          },
          {
            timestamp: 1641877200000,
            value: 82.79364805267967
          },
          {
            timestamp: 1641963600000,
            value: 75.651709916251
          },
          {
            timestamp: 1642050000000,
            value: 76.4558252019963
          },
          {
            timestamp: 1642136400000,
            value: 79.10184169356535
          },
          {
            timestamp: 1642482000000,
            value: 76.65223459255799
          },
          {
            timestamp: 1642568400000,
            value: 74.02589819427786
          },
          {
            timestamp: 1642654800000,
            value: 75.38811535132598
          },
          {
            timestamp: 1642741200000,
            value: 69.04475008152119
          },
          {
            timestamp: 1643000400000,
            value: 72.05444470436167
          },
          {
            timestamp: 1643086800000,
            value: 60.88679833651903
          },
          {
            timestamp: 1643173200000,
            value: 59.74818939174224
          },
          {
            timestamp: 1643259600000,
            value: 65.49845521185752
          },
          {
            timestamp: 1643346000000,
            value: 73.06186427713467
          },
          {
            timestamp: 1643605200000,
            value: 70.55204101943524
          }
        ]
      },
      status: 'OK',
      request_id: 'b14c869f944326010b51d83add4f4c75'
    }
  ],
  [
    'CUBE',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/CUBE/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 54.91923641703379
          },
          {
            timestamp: 1641272400000,
            value: 52.590589507842076
          },
          {
            timestamp: 1641358800000,
            value: 47.903293038766144
          },
          {
            timestamp: 1641445200000,
            value: 48.72357945172072
          },
          {
            timestamp: 1641531600000,
            value: 32.88647959461079
          },
          {
            timestamp: 1641790800000,
            value: 40.44687628580141
          },
          {
            timestamp: 1641877200000,
            value: 43.82147788568755
          },
          {
            timestamp: 1641963600000,
            value: 45.262401276402045
          },
          {
            timestamp: 1642050000000,
            value: 40.80515280218567
          },
          {
            timestamp: 1642136400000,
            value: 36.33207675280051
          },
          {
            timestamp: 1642482000000,
            value: 32.666605454203804
          },
          {
            timestamp: 1642568400000,
            value: 33.7168352188518
          },
          {
            timestamp: 1642654800000,
            value: 32.73494686338384
          },
          {
            timestamp: 1642741200000,
            value: 37.29715623486506
          },
          {
            timestamp: 1643000400000,
            value: 37.11021895431098
          },
          {
            timestamp: 1643086800000,
            value: 35.805669766188885
          },
          {
            timestamp: 1643173200000,
            value: 31.872951661100842
          },
          {
            timestamp: 1643259600000,
            value: 30.836733030321767
          },
          {
            timestamp: 1643346000000,
            value: 44.57552737988819
          },
          {
            timestamp: 1643605200000,
            value: 43.62643866908148
          }
        ]
      },
      status: 'OK',
      request_id: 'a54e061acb2e61d7aa3feb240510cd63'
    }
  ],
  [
    'CERN',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/CERN/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 97.85012285012289
          },
          {
            timestamp: 1641272400000,
            value: 96.57246782316733
          },
          {
            timestamp: 1641358800000,
            value: 95.96522371460347
          },
          {
            timestamp: 1641445200000,
            value: 94.61266836509598
          },
          {
            timestamp: 1641531600000,
            value: 94.31130116950332
          },
          {
            timestamp: 1641790800000,
            value: 94.1498203781054
          },
          {
            timestamp: 1641877200000,
            value: 93.8038868583103
          },
          {
            timestamp: 1641963600000,
            value: 93.25040952460438
          },
          {
            timestamp: 1642050000000,
            value: 93.15175806965927
          },
          {
            timestamp: 1642136400000,
            value: 93.16732697450362
          },
          {
            timestamp: 1642482000000,
            value: 91.15867739523893
          },
          {
            timestamp: 1642568400000,
            value: 88.20067858276681
          },
          {
            timestamp: 1642654800000,
            value: 85.00180203867981
          },
          {
            timestamp: 1642741200000,
            value: 85.42864816492568
          },
          {
            timestamp: 1643000400000,
            value: 85.44988374432123
          },
          {
            timestamp: 1643086800000,
            value: 81.12113963207321
          },
          {
            timestamp: 1643173200000,
            value: 77.9925449375735
          },
          {
            timestamp: 1643259600000,
            value: 78.90379510029747
          },
          {
            timestamp: 1643346000000,
            value: 78.93991439511754
          },
          {
            timestamp: 1643605200000,
            value: 76.26804142850389
          }
        ]
      },
      status: 'OK',
      request_id: '52e0326f7957cf36dd14793ddd9a5d41'
    }
  ],
  [
    'DD',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/DD/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 63.50626118067974
          },
          {
            timestamp: 1641272400000,
            value: 69.10171268787136
          },
          {
            timestamp: 1641358800000,
            value: 64.83111772570187
          },
          {
            timestamp: 1641445200000,
            value: 65.44441528118216
          },
          {
            timestamp: 1641531600000,
            value: 68.9438378403528
          },
          {
            timestamp: 1641790800000,
            value: 62.062531453634406
          },
          {
            timestamp: 1641877200000,
            value: 65.30293362567235
          },
          {
            timestamp: 1641963600000,
            value: 67.26311316750215
          },
          {
            timestamp: 1642050000000,
            value: 68.07933574956955
          },
          {
            timestamp: 1642136400000,
            value: 70.68500325891496
          },
          {
            timestamp: 1642482000000,
            value: 63.68673249364409
          },
          {
            timestamp: 1642568400000,
            value: 53.31281827520824
          },
          {
            timestamp: 1642654800000,
            value: 44.71648651789467
          },
          {
            timestamp: 1642741200000,
            value: 39.79315124986294
          },
          {
            timestamp: 1643000400000,
            value: 38.92936242541949
          },
          {
            timestamp: 1643086800000,
            value: 38.04010872470161
          },
          {
            timestamp: 1643173200000,
            value: 37.778728371663696
          },
          {
            timestamp: 1643259600000,
            value: 37.01783399105874
          },
          {
            timestamp: 1643346000000,
            value: 35.71635218000492
          },
          {
            timestamp: 1643605200000,
            value: 38.64771196656352
          }
        ]
      },
      status: 'OK',
      request_id: '682b4f6cb1998bff8a2d0b184d2d1ae3'
    }
  ],
  [
    'MBIN',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/MBIN/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 74.63177145116639
          },
          {
            timestamp: 1641272400000,
            value: 77.10890701871145
          },
          {
            timestamp: 1641358800000,
            value: 75.164925316692
          },
          {
            timestamp: 1641445200000,
            value: 79.95427679758265
          },
          {
            timestamp: 1641531600000,
            value: 81.30728204301016
          },
          {
            timestamp: 1641790800000,
            value: 77.51021657242907
          },
          {
            timestamp: 1641877200000,
            value: 71.91122858690986
          },
          {
            timestamp: 1641963600000,
            value: 72.22653459240415
          },
          {
            timestamp: 1642050000000,
            value: 74.4732199505421
          },
          {
            timestamp: 1642136400000,
            value: 76.3701014525937
          },
          {
            timestamp: 1642482000000,
            value: 63.23391517807012
          },
          {
            timestamp: 1642568400000,
            value: 47.863022914111944
          },
          {
            timestamp: 1642654800000,
            value: 41.60615260034975
          },
          {
            timestamp: 1642741200000,
            value: 38.964985836454844
          },
          {
            timestamp: 1643000400000,
            value: 48.83130896300809
          },
          {
            timestamp: 1643086800000,
            value: 45.250648849473045
          },
          {
            timestamp: 1643173200000,
            value: 47.33025289327228
          },
          {
            timestamp: 1643259600000,
            value: 41.31390907161486
          },
          {
            timestamp: 1643346000000,
            value: 38.19985543882917
          },
          {
            timestamp: 1643605200000,
            value: 39.768101080266604
          }
        ]
      },
      status: 'OK',
      request_id: 'edde3155f37d519e34a3c781118d57d4'
    }
  ],
  [
    'EVBN',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/EVBN/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 57.37234652897301
          },
          {
            timestamp: 1641272400000,
            value: 56.362453934532844
          },
          {
            timestamp: 1641358800000,
            value: 61.45234609073258
          },
          {
            timestamp: 1641445200000,
            value: 57.31778900165611
          },
          {
            timestamp: 1641531600000,
            value: 61.803198203833006
          },
          {
            timestamp: 1641790800000,
            value: 59.64875701247604
          },
          {
            timestamp: 1641877200000,
            value: 61.77723533006572
          },
          {
            timestamp: 1641963600000,
            value: 55.698078932993056
          },
          {
            timestamp: 1642050000000,
            value: 54.41657996539486
          },
          {
            timestamp: 1642136400000,
            value: 58.965206728430346
          },
          {
            timestamp: 1642482000000,
            value: 61.5876369340772
          },
          {
            timestamp: 1642568400000,
            value: 62.54243632731109
          },
          {
            timestamp: 1642654800000,
            value: 57.395503832329474
          },
          {
            timestamp: 1642741200000,
            value: 53.437147795670654
          },
          {
            timestamp: 1643000400000,
            value: 52.19118996948284
          },
          {
            timestamp: 1643086800000,
            value: 55.71268032774692
          },
          {
            timestamp: 1643173200000,
            value: 55.32769781646763
          },
          {
            timestamp: 1643259600000,
            value: 51.890908477459575
          },
          {
            timestamp: 1643346000000,
            value: 52.638475199257165
          },
          {
            timestamp: 1643605200000,
            value: 64.59939820154742
          }
        ]
      },
      status: 'OK',
      request_id: '451f5408c829a0eabdd6b9ab8772bad4'
    }
  ],
  [
    'UFCS',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/UFCS/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 50.3344481605351
          },
          {
            timestamp: 1641272400000,
            value: 52.63738959764475
          },
          {
            timestamp: 1641358800000,
            value: 49.87036904591617
          },
          {
            timestamp: 1641445200000,
            value: 54.34984368894098
          },
          {
            timestamp: 1641531600000,
            value: 59.25146011841941
          },
          {
            timestamp: 1641790800000,
            value: 57.81162878030921
          },
          {
            timestamp: 1641877200000,
            value: 53.418129444142075
          },
          {
            timestamp: 1641963600000,
            value: 51.40998860222028
          },
          {
            timestamp: 1642050000000,
            value: 56.96820154729493
          },
          {
            timestamp: 1642136400000,
            value: 61.62502814328307
          },
          {
            timestamp: 1642482000000,
            value: 56.533831049547246
          },
          {
            timestamp: 1642568400000,
            value: 49.762499546179555
          },
          {
            timestamp: 1642654800000,
            value: 48.79420992593042
          },
          {
            timestamp: 1642741200000,
            value: 48.4557464528259
          },
          {
            timestamp: 1643000400000,
            value: 55.731035376669105
          },
          {
            timestamp: 1643086800000,
            value: 55.95925234905015
          },
          {
            timestamp: 1643173200000,
            value: 54.15529833960967
          },
          {
            timestamp: 1643259600000,
            value: 48.876293861066635
          },
          {
            timestamp: 1643346000000,
            value: 51.33921555467768
          },
          {
            timestamp: 1643605200000,
            value: 56.06670921744937
          }
        ]
      },
      status: 'OK',
      request_id: 'bdae85c0ed55786f376e4c573c730d35'
    }
  ],
  [
    'CLAQ',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/CLAQ/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 44.18874941887494
          },
          {
            timestamp: 1641272400000,
            value: 43.12011446119488
          },
          {
            timestamp: 1641358800000,
            value: 45.126634727437704
          },
          {
            timestamp: 1641445200000,
            value: 46.01196134269668
          },
          {
            timestamp: 1641531600000,
            value: 44.717025461129786
          },
          {
            timestamp: 1641790800000,
            value: 44.717025461129786
          },
          {
            timestamp: 1641877200000,
            value: 43.303606373883326
          },
          {
            timestamp: 1641963600000,
            value: 40.54345155649036
          },
          {
            timestamp: 1642050000000,
            value: 44.362553482308016
          },
          {
            timestamp: 1642136400000,
            value: 44.36255348230802
          },
          {
            timestamp: 1642482000000,
            value: 43.55145498058794
          },
          {
            timestamp: 1642568400000,
            value: 44.641454773252896
          },
          {
            timestamp: 1642654800000,
            value: 47.418755597418254
          },
          {
            timestamp: 1642741200000,
            value: 44.98811506935379
          },
          {
            timestamp: 1643000400000,
            value: 43.1320760521246
          },
          {
            timestamp: 1643086800000,
            value: 37.99900252510901
          },
          {
            timestamp: 1643173200000,
            value: 45.021756093203955
          },
          {
            timestamp: 1643259600000,
            value: 48.18216106981173
          },
          {
            timestamp: 1643346000000,
            value: 47.20799970627998
          },
          {
            timestamp: 1643605200000,
            value: 47.20799970627998
          }
        ]
      },
      status: 'OK',
      request_id: '818571573f27366619a913bb18d5fa49'
    }
  ],
  [
    'CLAQR',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/CLAQR/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641272400000,
            value: 72.22889155662264
          },
          {
            timestamp: 1641358800000,
            value: 72.22889155662264
          },
          {
            timestamp: 1641445200000,
            value: 68.69036922945278
          },
          {
            timestamp: 1641531600000,
            value: 57.97198539112137
          },
          {
            timestamp: 1641790800000,
            value: 57.97198539112137
          },
          {
            timestamp: 1641877200000,
            value: 59.84014134640001
          },
          {
            timestamp: 1641963600000,
            value: 50.22264663973409
          },
          {
            timestamp: 1642050000000,
            value: 58.9158064406733
          },
          {
            timestamp: 1642136400000,
            value: 54.923347239540206
          },
          {
            timestamp: 1642482000000,
            value: 54.6910518978065
          },
          {
            timestamp: 1642568400000,
            value: 66.95209553994201
          },
          {
            timestamp: 1642654800000,
            value: 64.8430612440763
          },
          {
            timestamp: 1642741200000,
            value: 54.090276161028065
          },
          {
            timestamp: 1643000400000,
            value: 44.71496203752953
          },
          {
            timestamp: 1643086800000,
            value: 46.93221162925741
          },
          {
            timestamp: 1643173200000,
            value: 40.66034535173507
          },
          {
            timestamp: 1643259600000,
            value: 43.38601731637089
          },
          {
            timestamp: 1643346000000,
            value: 43.386017316370896
          },
          {
            timestamp: 1643605200000,
            value: 38.59240550559401
          }
        ]
      },
      status: 'OK',
      request_id: '3dde1f7d5d5e01b789451f67bfb5bfcc'
    }
  ],
  [
    'CLAQW',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/CLAQW/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 60.90909090909087
          },
          {
            timestamp: 1641272400000,
            value: 60.4817709840266
          },
          {
            timestamp: 1641358800000,
            value: 62.530149303520886
          },
          {
            timestamp: 1641445200000,
            value: 59.0577638812779
          },
          {
            timestamp: 1641531600000,
            value: 52.69212573875231
          },
          {
            timestamp: 1641790800000,
            value: 47.162325634347575
          },
          {
            timestamp: 1641877200000,
            value: 46.978345350821094
          },
          {
            timestamp: 1641963600000,
            value: 44.52019952078101
          },
          {
            timestamp: 1642050000000,
            value: 61.152358210186385
          },
          {
            timestamp: 1642136400000,
            value: 58.45259881131737
          },
          {
            timestamp: 1642482000000,
            value: 53.377070376787
          },
          {
            timestamp: 1642568400000,
            value: 49.4896974256669
          },
          {
            timestamp: 1642654800000,
            value: 53.163145293037694
          },
          {
            timestamp: 1642741200000,
            value: 44.80749964681886
          },
          {
            timestamp: 1643000400000,
            value: 41.37589307535064
          },
          {
            timestamp: 1643086800000,
            value: 56.071534695448605
          },
          {
            timestamp: 1643173200000,
            value: 41.87907940030459
          },
          {
            timestamp: 1643259600000,
            value: 38.69766332331041
          },
          {
            timestamp: 1643346000000,
            value: 34.067917729692155
          },
          {
            timestamp: 1643605200000,
            value: 31.623276226957444
          }
        ]
      },
      status: 'OK',
      request_id: 'e52b4cd061c2fcae3f8aa1cf61ee0522'
    }
  ],
  [
    'CLAQU',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/CLAQU/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641445200000,
            value: 45.758860951226914
          },
          {
            timestamp: 1641531600000,
            value: 45.758860951226914
          },
          {
            timestamp: 1641790800000,
            value: 42.06418518658888
          },
          {
            timestamp: 1641877200000,
            value: 50.426674788021046
          },
          {
            timestamp: 1641963600000,
            value: 50.18540656691795
          },
          {
            timestamp: 1642050000000,
            value: 50.18540656691795
          },
          {
            timestamp: 1642136400000,
            value: 50.7321738922711
          },
          {
            timestamp: 1642482000000,
            value: 49.560527492485605
          },
          {
            timestamp: 1642568400000,
            value: 49.768746579657964
          },
          {
            timestamp: 1642654800000,
            value: 49.768746579657964
          },
          {
            timestamp: 1642741200000,
            value: 50.245160773258384
          },
          {
            timestamp: 1643000400000,
            value: 50.245160773258384
          },
          {
            timestamp: 1643086800000,
            value: 42.72566297793555
          },
          {
            timestamp: 1643173200000,
            value: 42.72566297793555
          },
          {
            timestamp: 1643259600000,
            value: 42.72566297793555
          },
          {
            timestamp: 1643346000000,
            value: 42.72566297793555
          },
          {
            timestamp: 1643605200000,
            value: 42.72566297793555
          }
        ]
      },
      status: 'OK',
      request_id: '501cb3080e5e20b8fa628d3b7807bac7'
    }
  ],
  [
    'SRPT',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/SRPT/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 71.63375224416527
          },
          {
            timestamp: 1641272400000,
            value: 63.85571833066604
          },
          {
            timestamp: 1641358800000,
            value: 43.424026789451666
          },
          {
            timestamp: 1641445200000,
            value: 52.49628052475695
          },
          {
            timestamp: 1641531600000,
            value: 48.33743177516537
          },
          {
            timestamp: 1641790800000,
            value: 30.792342572184097
          },
          {
            timestamp: 1641877200000,
            value: 31.33774459818241
          },
          {
            timestamp: 1641963600000,
            value: 28.31495790783609
          },
          {
            timestamp: 1642050000000,
            value: 26.51701545491582
          },
          {
            timestamp: 1642136400000,
            value: 25.097809327357623
          },
          {
            timestamp: 1642482000000,
            value: 20.5297751504134
          },
          {
            timestamp: 1642568400000,
            value: 18.38107317595447
          },
          {
            timestamp: 1642654800000,
            value: 22.610345256323626
          },
          {
            timestamp: 1642741200000,
            value: 21.669820413552813
          },
          {
            timestamp: 1643000400000,
            value: 32.07517823785314
          },
          {
            timestamp: 1643086800000,
            value: 35.47354855376642
          },
          {
            timestamp: 1643173200000,
            value: 39.03773403682298
          },
          {
            timestamp: 1643259600000,
            value: 34.527306180887564
          },
          {
            timestamp: 1643346000000,
            value: 40.69826007361142
          },
          {
            timestamp: 1643605200000,
            value: 44.46930261629892
          }
        ]
      },
      status: 'OK',
      request_id: '22f7d574183af923c66b2a9747463325'
    }
  ],
  [
    'SRPT',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/SRPT/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 71.63375224416527
          },
          {
            timestamp: 1641272400000,
            value: 63.85571833066604
          },
          {
            timestamp: 1641358800000,
            value: 43.424026789451666
          },
          {
            timestamp: 1641445200000,
            value: 52.49628052475695
          },
          {
            timestamp: 1641531600000,
            value: 48.33743177516537
          },
          {
            timestamp: 1641790800000,
            value: 30.792342572184097
          },
          {
            timestamp: 1641877200000,
            value: 31.33774459818241
          },
          {
            timestamp: 1641963600000,
            value: 28.31495790783609
          },
          {
            timestamp: 1642050000000,
            value: 26.51701545491582
          },
          {
            timestamp: 1642136400000,
            value: 25.097809327357623
          },
          {
            timestamp: 1642482000000,
            value: 20.5297751504134
          },
          {
            timestamp: 1642568400000,
            value: 18.38107317595447
          },
          {
            timestamp: 1642654800000,
            value: 22.610345256323626
          },
          {
            timestamp: 1642741200000,
            value: 21.669820413552813
          },
          {
            timestamp: 1643000400000,
            value: 32.07517823785314
          },
          {
            timestamp: 1643086800000,
            value: 35.47354855376642
          },
          {
            timestamp: 1643173200000,
            value: 39.03773403682298
          },
          {
            timestamp: 1643259600000,
            value: 34.527306180887564
          },
          {
            timestamp: 1643346000000,
            value: 40.69826007361142
          },
          {
            timestamp: 1643605200000,
            value: 44.46930261629892
          }
        ]
      },
      status: 'OK',
      request_id: '22f7d574183af923c66b2a9747463325'
    }
  ],
  [
    'SRPT',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/SRPT/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 71.63375224416527
          },
          {
            timestamp: 1641272400000,
            value: 63.85571833066604
          },
          {
            timestamp: 1641358800000,
            value: 43.424026789451666
          },
          {
            timestamp: 1641445200000,
            value: 52.49628052475695
          },
          {
            timestamp: 1641531600000,
            value: 48.33743177516537
          },
          {
            timestamp: 1641790800000,
            value: 30.792342572184097
          },
          {
            timestamp: 1641877200000,
            value: 31.33774459818241
          },
          {
            timestamp: 1641963600000,
            value: 28.31495790783609
          },
          {
            timestamp: 1642050000000,
            value: 26.51701545491582
          },
          {
            timestamp: 1642136400000,
            value: 25.097809327357623
          },
          {
            timestamp: 1642482000000,
            value: 20.5297751504134
          },
          {
            timestamp: 1642568400000,
            value: 18.38107317595447
          },
          {
            timestamp: 1642654800000,
            value: 22.610345256323626
          },
          {
            timestamp: 1642741200000,
            value: 21.669820413552813
          },
          {
            timestamp: 1643000400000,
            value: 32.07517823785314
          },
          {
            timestamp: 1643086800000,
            value: 35.47354855376642
          },
          {
            timestamp: 1643173200000,
            value: 39.03773403682298
          },
          {
            timestamp: 1643259600000,
            value: 34.527306180887564
          },
          {
            timestamp: 1643346000000,
            value: 40.69826007361142
          },
          {
            timestamp: 1643605200000,
            value: 44.46930261629892
          }
        ]
      },
      status: 'OK',
      request_id: '22f7d574183af923c66b2a9747463325'
    }
  ],
  [
    'SRPT',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/SRPT/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 71.63375224416527
          },
          {
            timestamp: 1641272400000,
            value: 63.85571833066604
          },
          {
            timestamp: 1641358800000,
            value: 43.424026789451666
          },
          {
            timestamp: 1641445200000,
            value: 52.49628052475695
          },
          {
            timestamp: 1641531600000,
            value: 48.33743177516537
          },
          {
            timestamp: 1641790800000,
            value: 30.792342572184097
          },
          {
            timestamp: 1641877200000,
            value: 31.33774459818241
          },
          {
            timestamp: 1641963600000,
            value: 28.31495790783609
          },
          {
            timestamp: 1642050000000,
            value: 26.51701545491582
          },
          {
            timestamp: 1642136400000,
            value: 25.097809327357623
          },
          {
            timestamp: 1642482000000,
            value: 20.5297751504134
          },
          {
            timestamp: 1642568400000,
            value: 18.38107317595447
          },
          {
            timestamp: 1642654800000,
            value: 22.610345256323626
          },
          {
            timestamp: 1642741200000,
            value: 21.669820413552813
          },
          {
            timestamp: 1643000400000,
            value: 32.07517823785314
          },
          {
            timestamp: 1643086800000,
            value: 35.47354855376642
          },
          {
            timestamp: 1643173200000,
            value: 39.03773403682298
          },
          {
            timestamp: 1643259600000,
            value: 34.527306180887564
          },
          {
            timestamp: 1643346000000,
            value: 40.69826007361142
          },
          {
            timestamp: 1643605200000,
            value: 44.46930261629892
          }
        ]
      },
      status: 'OK',
      request_id: '22f7d574183af923c66b2a9747463325'
    }
  ],
  [
    'SRPT',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/SRPT/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 71.63375224416527
          },
          {
            timestamp: 1641272400000,
            value: 63.85571833066604
          },
          {
            timestamp: 1641358800000,
            value: 43.424026789451666
          },
          {
            timestamp: 1641445200000,
            value: 52.49628052475695
          },
          {
            timestamp: 1641531600000,
            value: 48.33743177516537
          },
          {
            timestamp: 1641790800000,
            value: 30.792342572184097
          },
          {
            timestamp: 1641877200000,
            value: 31.33774459818241
          },
          {
            timestamp: 1641963600000,
            value: 28.31495790783609
          },
          {
            timestamp: 1642050000000,
            value: 26.51701545491582
          },
          {
            timestamp: 1642136400000,
            value: 25.097809327357623
          },
          {
            timestamp: 1642482000000,
            value: 20.5297751504134
          },
          {
            timestamp: 1642568400000,
            value: 18.38107317595447
          },
          {
            timestamp: 1642654800000,
            value: 22.610345256323626
          },
          {
            timestamp: 1642741200000,
            value: 21.669820413552813
          },
          {
            timestamp: 1643000400000,
            value: 32.07517823785314
          },
          {
            timestamp: 1643086800000,
            value: 35.47354855376642
          },
          {
            timestamp: 1643173200000,
            value: 39.03773403682298
          },
          {
            timestamp: 1643259600000,
            value: 34.527306180887564
          },
          {
            timestamp: 1643346000000,
            value: 40.69826007361142
          },
          {
            timestamp: 1643605200000,
            value: 44.46930261629892
          }
        ]
      },
      status: 'OK',
      request_id: '22f7d574183af923c66b2a9747463325'
    }
  ],
  [
    'PSA',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/PSA/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 63.33401765551214
          },
          {
            timestamp: 1641272400000,
            value: 62.98588098566103
          },
          {
            timestamp: 1641358800000,
            value: 58.47226194281352
          },
          {
            timestamp: 1641445200000,
            value: 61.708355099712435
          },
          {
            timestamp: 1641531600000,
            value: 50.51139223965926
          },
          {
            timestamp: 1641790800000,
            value: 54.22056012046878
          },
          {
            timestamp: 1641877200000,
            value: 56.91546370362183
          },
          {
            timestamp: 1641963600000,
            value: 60.68302547164346
          },
          {
            timestamp: 1642050000000,
            value: 57.10198516243102
          },
          {
            timestamp: 1642136400000,
            value: 54.178163548091916
          },
          {
            timestamp: 1642482000000,
            value: 51.90183714524787
          },
          {
            timestamp: 1642568400000,
            value: 49.00628254596593
          },
          {
            timestamp: 1642654800000,
            value: 44.42247707422102
          },
          {
            timestamp: 1642741200000,
            value: 45.52701653854049
          },
          {
            timestamp: 1643000400000,
            value: 44.28368383270661
          },
          {
            timestamp: 1643086800000,
            value: 44.776256811804835
          },
          {
            timestamp: 1643173200000,
            value: 40.29679905059827
          },
          {
            timestamp: 1643259600000,
            value: 38.45544351883339
          },
          {
            timestamp: 1643346000000,
            value: 54.970701745189146
          },
          {
            timestamp: 1643605200000,
            value: 52.79565246769331
          }
        ]
      },
      status: 'OK',
      request_id: 'af68d992237f8224f9d455a1fe752014'
    }
  ],
  [
    'NMM',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/NMM/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 57.66331658291457
          },
          {
            timestamp: 1641272400000,
            value: 55.48633066765854
          },
          {
            timestamp: 1641358800000,
            value: 48.72366619348518
          },
          {
            timestamp: 1641445200000,
            value: 48.99416241239533
          },
          {
            timestamp: 1641531600000,
            value: 49.06650140115607
          },
          {
            timestamp: 1641790800000,
            value: 45.4562751336316
          },
          {
            timestamp: 1641877200000,
            value: 50.23382753022926
          },
          {
            timestamp: 1641963600000,
            value: 49.41987490836294
          },
          {
            timestamp: 1642050000000,
            value: 45.124884410840956
          },
          {
            timestamp: 1642136400000,
            value: 51.07737054370681
          },
          {
            timestamp: 1642482000000,
            value: 54.037336193969104
          },
          {
            timestamp: 1642568400000,
            value: 56.035875929296196
          },
          {
            timestamp: 1642654800000,
            value: 57.55950517492574
          },
          {
            timestamp: 1642741200000,
            value: 46.352342454321914
          },
          {
            timestamp: 1643000400000,
            value: 44.176457294678016
          },
          {
            timestamp: 1643086800000,
            value: 49.56694341984915
          },
          {
            timestamp: 1643173200000,
            value: 50.6759702061128
          },
          {
            timestamp: 1643259600000,
            value: 60.31015009123364
          },
          {
            timestamp: 1643346000000,
            value: 66.96286694408542
          },
          {
            timestamp: 1643605200000,
            value: 63.94834943766059
          }
        ]
      },
      status: 'OK',
      request_id: '757abe04a722c866c8d44d94028f394b'
    }
  ],
  [
    'NMM',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/NMM/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 57.66331658291457
          },
          {
            timestamp: 1641272400000,
            value: 55.48633066765854
          },
          {
            timestamp: 1641358800000,
            value: 48.72366619348518
          },
          {
            timestamp: 1641445200000,
            value: 48.99416241239533
          },
          {
            timestamp: 1641531600000,
            value: 49.06650140115607
          },
          {
            timestamp: 1641790800000,
            value: 45.4562751336316
          },
          {
            timestamp: 1641877200000,
            value: 50.23382753022926
          },
          {
            timestamp: 1641963600000,
            value: 49.41987490836294
          },
          {
            timestamp: 1642050000000,
            value: 45.124884410840956
          },
          {
            timestamp: 1642136400000,
            value: 51.07737054370681
          },
          {
            timestamp: 1642482000000,
            value: 54.037336193969104
          },
          {
            timestamp: 1642568400000,
            value: 56.035875929296196
          },
          {
            timestamp: 1642654800000,
            value: 57.55950517492574
          },
          {
            timestamp: 1642741200000,
            value: 46.352342454321914
          },
          {
            timestamp: 1643000400000,
            value: 44.176457294678016
          },
          {
            timestamp: 1643086800000,
            value: 49.56694341984915
          },
          {
            timestamp: 1643173200000,
            value: 50.6759702061128
          },
          {
            timestamp: 1643259600000,
            value: 60.31015009123364
          },
          {
            timestamp: 1643346000000,
            value: 66.96286694408542
          },
          {
            timestamp: 1643605200000,
            value: 63.94834943766059
          }
        ]
      },
      status: 'OK',
      request_id: '757abe04a722c866c8d44d94028f394b'
    }
  ],
  [
    'GPN',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/GPN/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 70.6152433425161
          },
          {
            timestamp: 1641272400000,
            value: 73.83263791332065
          },
          {
            timestamp: 1641358800000,
            value: 74.62672795204354
          },
          {
            timestamp: 1641445200000,
            value: 78.12221713371713
          },
          {
            timestamp: 1641531600000,
            value: 75.6637492960583
          },
          {
            timestamp: 1641790800000,
            value: 68.6609851066472
          },
          {
            timestamp: 1641877200000,
            value: 70.5820180315277
          },
          {
            timestamp: 1641963600000,
            value: 69.7666801020365
          },
          {
            timestamp: 1642050000000,
            value: 70.27636138209192
          },
          {
            timestamp: 1642136400000,
            value: 71.60072108987896
          },
          {
            timestamp: 1642482000000,
            value: 63.567797533495416
          },
          {
            timestamp: 1642568400000,
            value: 60.92222736643607
          },
          {
            timestamp: 1642654800000,
            value: 58.79702415091275
          },
          {
            timestamp: 1642741200000,
            value: 50.966083320707945
          },
          {
            timestamp: 1643000400000,
            value: 51.034769248451546
          },
          {
            timestamp: 1643086800000,
            value: 48.63212000630874
          },
          {
            timestamp: 1643173200000,
            value: 50.5092223816894
          },
          {
            timestamp: 1643259600000,
            value: 51.57865749747724
          },
          {
            timestamp: 1643346000000,
            value: 61.76936279867841
          },
          {
            timestamp: 1643605200000,
            value: 64.981873872339
          }
        ]
      },
      status: 'OK',
      request_id: '5fe3375ed3aa25d80cedacb97600fae6'
    }
  ],
  [
    'KHC',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/KHC/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 68.0851063829787
          },
          {
            timestamp: 1641272400000,
            value: 73.85182701977868
          },
          {
            timestamp: 1641358800000,
            value: 71.15456284628186
          },
          {
            timestamp: 1641445200000,
            value: 71.67447700158206
          },
          {
            timestamp: 1641531600000,
            value: 75.24410626680205
          },
          {
            timestamp: 1641790800000,
            value: 75.30854887807496
          },
          {
            timestamp: 1641877200000,
            value: 76.80415501157393
          },
          {
            timestamp: 1641963600000,
            value: 70.96723982559294
          },
          {
            timestamp: 1642050000000,
            value: 73.57719099841378
          },
          {
            timestamp: 1642136400000,
            value: 76.03034187171787
          },
          {
            timestamp: 1642482000000,
            value: 65.57540892200409
          },
          {
            timestamp: 1642568400000,
            value: 62.29204613513065
          },
          {
            timestamp: 1642654800000,
            value: 59.833884511274626
          },
          {
            timestamp: 1642741200000,
            value: 58.89529777904457
          },
          {
            timestamp: 1643000400000,
            value: 50.262788415539376
          },
          {
            timestamp: 1643086800000,
            value: 48.0258262690267
          },
          {
            timestamp: 1643173200000,
            value: 45.94602837991673
          },
          {
            timestamp: 1643259600000,
            value: 46.67744197655177
          },
          {
            timestamp: 1643346000000,
            value: 46.139564227274164
          },
          {
            timestamp: 1643605200000,
            value: 42.81853259869965
          }
        ]
      },
      status: 'OK',
      request_id: '7a7e3e10fbbd080ec5038ad9491697e6'
    }
  ],
  [
    'EMN',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/EMN/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 60.98130841121494
          },
          {
            timestamp: 1641272400000,
            value: 66.33847585084115
          },
          {
            timestamp: 1641358800000,
            value: 66.26102702477323
          },
          {
            timestamp: 1641445200000,
            value: 66.2822234667109
          },
          {
            timestamp: 1641531600000,
            value: 66.865097668282
          },
          {
            timestamp: 1641790800000,
            value: 55.79817224884588
          },
          {
            timestamp: 1641877200000,
            value: 60.29485146569608
          },
          {
            timestamp: 1641963600000,
            value: 63.66490118932369
          },
          {
            timestamp: 1642050000000,
            value: 70.20784071911237
          },
          {
            timestamp: 1642136400000,
            value: 71.84000748465323
          },
          {
            timestamp: 1642482000000,
            value: 72.07100643154291
          },
          {
            timestamp: 1642568400000,
            value: 71.31500208298476
          },
          {
            timestamp: 1642654800000,
            value: 53.41415741430461
          },
          {
            timestamp: 1642741200000,
            value: 48.325791211288724
          },
          {
            timestamp: 1643000400000,
            value: 46.3813035062313
          },
          {
            timestamp: 1643086800000,
            value: 45.363758351333594
          },
          {
            timestamp: 1643173200000,
            value: 46.25833095064082
          },
          {
            timestamp: 1643259600000,
            value: 44.805665680422806
          },
          {
            timestamp: 1643346000000,
            value: 43.868659855727415
          },
          {
            timestamp: 1643605200000,
            value: 46.384279342939635
          }
        ]
      },
      status: 'OK',
      request_id: '1379dbd7eef1c7a9be09fc3d57ed583d'
    }
  ],
  [
    'KELYA',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/KELYA/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 56.66666666666664
          },
          {
            timestamp: 1641272400000,
            value: 61.644553072625655
          },
          {
            timestamp: 1641358800000,
            value: 61.00228577503718
          },
          {
            timestamp: 1641445200000,
            value: 60.49322017403711
          },
          {
            timestamp: 1641531600000,
            value: 55.81182476357552
          },
          {
            timestamp: 1641790800000,
            value: 54.04243753590092
          },
          {
            timestamp: 1641877200000,
            value: 57.35169423065557
          },
          {
            timestamp: 1641963600000,
            value: 55.29355887072791
          },
          {
            timestamp: 1642050000000,
            value: 59.93831419123842
          },
          {
            timestamp: 1642136400000,
            value: 60.791326146324096
          },
          {
            timestamp: 1642482000000,
            value: 49.451847192817084
          },
          {
            timestamp: 1642568400000,
            value: 45.89574438998914
          },
          {
            timestamp: 1642654800000,
            value: 41.60026799097965
          },
          {
            timestamp: 1642741200000,
            value: 39.49909482449661
          },
          {
            timestamp: 1643000400000,
            value: 48.99106587990352
          },
          {
            timestamp: 1643086800000,
            value: 44.90566191289996
          },
          {
            timestamp: 1643173200000,
            value: 40.257376947367106
          },
          {
            timestamp: 1643259600000,
            value: 39.095209769351925
          },
          {
            timestamp: 1643346000000,
            value: 41.37351387597696
          },
          {
            timestamp: 1643605200000,
            value: 46.14641285157087
          }
        ]
      },
      status: 'OK',
      request_id: '3412256d3074c2a2103c01f037146ef9'
    }
  ],
  [
    'KELYB',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/KELYB/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641272400000,
            value: 53.706701197798616
          },
          {
            timestamp: 1641358800000,
            value: 60.472879590057595
          },
          {
            timestamp: 1641445200000,
            value: 60.472879590057595
          },
          {
            timestamp: 1641531600000,
            value: 55.14250520188067
          },
          {
            timestamp: 1641790800000,
            value: 51.822032150689196
          },
          {
            timestamp: 1641877200000,
            value: 55.614137200141684
          },
          {
            timestamp: 1641963600000,
            value: 55.614137200141684
          },
          {
            timestamp: 1642050000000,
            value: 60.91572207773457
          },
          {
            timestamp: 1642136400000,
            value: 60.91572207773457
          },
          {
            timestamp: 1642482000000,
            value: 60.91572207773457
          },
          {
            timestamp: 1642568400000,
            value: 60.91572207773457
          },
          {
            timestamp: 1642654800000,
            value: 41.46903132071067
          },
          {
            timestamp: 1642741200000,
            value: 36.88927879330104
          },
          {
            timestamp: 1643000400000,
            value: 36.88927879330104
          },
          {
            timestamp: 1643086800000,
            value: 36.889278793301045
          },
          {
            timestamp: 1643173200000,
            value: 36.889278793301045
          },
          {
            timestamp: 1643259600000,
            value: 36.889278793301045
          },
          {
            timestamp: 1643346000000,
            value: 36.889278793301045
          },
          {
            timestamp: 1643605200000,
            value: 36.727042665214846
          }
        ]
      },
      status: 'OK',
      request_id: 'a3b5f09aa684571059321c5e668e308c'
    }
  ],
  [
    'NXPI',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/NXPI/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 62.15104955637306
          },
          {
            timestamp: 1641272400000,
            value: 63.5525704118109
          },
          {
            timestamp: 1641358800000,
            value: 52.93413813254948
          },
          {
            timestamp: 1641445200000,
            value: 55.25259808119394
          },
          {
            timestamp: 1641531600000,
            value: 49.11494394256599
          },
          {
            timestamp: 1641790800000,
            value: 49.649873464946836
          },
          {
            timestamp: 1641877200000,
            value: 55.41425977702565
          },
          {
            timestamp: 1641963600000,
            value: 56.79495328097934
          },
          {
            timestamp: 1642050000000,
            value: 48.90474778993
          },
          {
            timestamp: 1642136400000,
            value: 52.32189239886073
          },
          {
            timestamp: 1642482000000,
            value: 44.901762696188754
          },
          {
            timestamp: 1642568400000,
            value: 39.89291263906404
          },
          {
            timestamp: 1642654800000,
            value: 32.95420040698495
          },
          {
            timestamp: 1642741200000,
            value: 33.328632477601616
          },
          {
            timestamp: 1643000400000,
            value: 36.815781015759896
          },
          {
            timestamp: 1643086800000,
            value: 32.01806682952903
          },
          {
            timestamp: 1643173200000,
            value: 34.44553388592546
          },
          {
            timestamp: 1643259600000,
            value: 29.7449093591774
          },
          {
            timestamp: 1643346000000,
            value: 31.41364974714996
          },
          {
            timestamp: 1643605200000,
            value: 46.18609435971595
          }
        ]
      },
      status: 'OK',
      request_id: '46cc2711c5a566e13536a99b804e6f19'
    }
  ],
  [
    'CHPT',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/CHPT/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 52.36875800256083
          },
          {
            timestamp: 1641272400000,
            value: 49.95771868833975
          },
          {
            timestamp: 1641358800000,
            value: 41.887707178135315
          },
          {
            timestamp: 1641445200000,
            value: 37.95516627743078
          },
          {
            timestamp: 1641531600000,
            value: 35.89421100344968
          },
          {
            timestamp: 1641790800000,
            value: 31.4556144448229
          },
          {
            timestamp: 1641877200000,
            value: 34.81823259626397
          },
          {
            timestamp: 1641963600000,
            value: 33.90186820421434
          },
          {
            timestamp: 1642050000000,
            value: 29.362478726280514
          },
          {
            timestamp: 1642136400000,
            value: 29.013834575570584
          },
          {
            timestamp: 1642482000000,
            value: 27.63564619947701
          },
          {
            timestamp: 1642568400000,
            value: 27.41985194160091
          },
          {
            timestamp: 1642654800000,
            value: 27.003541688785944
          },
          {
            timestamp: 1642741200000,
            value: 23.786113393825246
          },
          {
            timestamp: 1643000400000,
            value: 22.882679562484526
          },
          {
            timestamp: 1643086800000,
            value: 21.500690514747106
          },
          {
            timestamp: 1643173200000,
            value: 22.53131023783412
          },
          {
            timestamp: 1643259600000,
            value: 19.109011882385104
          },
          {
            timestamp: 1643346000000,
            value: 30.991212857437162
          },
          {
            timestamp: 1643605200000,
            value: 40.41674092597483
          }
        ]
      },
      status: 'OK',
      request_id: 'ac12b316a4b133cda9a0b1f79c563e27'
    }
  ],
  [
    'TTE',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/TTE/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 61.29870129870128
          },
          {
            timestamp: 1641272400000,
            value: 62.65664160401004
          },
          {
            timestamp: 1641358800000,
            value: 63.45336061885895
          },
          {
            timestamp: 1641445200000,
            value: 67.03808684707364
          },
          {
            timestamp: 1641531600000,
            value: 70.81559165752795
          },
          {
            timestamp: 1641790800000,
            value: 71.73772350807164
          },
          {
            timestamp: 1641877200000,
            value: 76.89851023345867
          },
          {
            timestamp: 1641963600000,
            value: 80.2872462269759
          },
          {
            timestamp: 1642050000000,
            value: 75.66880369286518
          },
          {
            timestamp: 1642136400000,
            value: 79.58655511317585
          },
          {
            timestamp: 1642482000000,
            value: 80.80819929013055
          },
          {
            timestamp: 1642568400000,
            value: 82.21159599240737
          },
          {
            timestamp: 1642654800000,
            value: 72.06092780297759
          },
          {
            timestamp: 1642741200000,
            value: 62.336361679535806
          },
          {
            timestamp: 1643000400000,
            value: 61.02684097452121
          },
          {
            timestamp: 1643086800000,
            value: 64.5617402448477
          },
          {
            timestamp: 1643173200000,
            value: 67.05024159263088
          },
          {
            timestamp: 1643259600000,
            value: 69.22254114438854
          },
          {
            timestamp: 1643346000000,
            value: 65.75450983503035
          },
          {
            timestamp: 1643605200000,
            value: 62.4499105251103
          }
        ]
      },
      status: 'OK',
      request_id: '3741385fbcc6bb3f6691f1eed2a149bd'
    }
  ],
  [
    'VIAC',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/VIAC/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 66.01941747572815
          },
          {
            timestamp: 1641272400000,
            value: 69.27232821205467
          },
          {
            timestamp: 1641358800000,
            value: 66.48012663118664
          },
          {
            timestamp: 1641445200000,
            value: 66.48012663118664
          },
          {
            timestamp: 1641531600000,
            value: 75.6790070672953
          },
          {
            timestamp: 1641790800000,
            value: 71.86096833955602
          },
          {
            timestamp: 1641877200000,
            value: 72.01932507504054
          },
          {
            timestamp: 1641963600000,
            value: 72.05319967406375
          },
          {
            timestamp: 1642050000000,
            value: 75.88838832710509
          },
          {
            timestamp: 1642136400000,
            value: 77.59803423505177
          },
          {
            timestamp: 1642482000000,
            value: 64.92789802487232
          },
          {
            timestamp: 1642568400000,
            value: 63.950078978429026
          },
          {
            timestamp: 1642654800000,
            value: 55.35678867946938
          },
          {
            timestamp: 1642741200000,
            value: 43.66282383764659
          },
          {
            timestamp: 1643000400000,
            value: 49.66535298758115
          },
          {
            timestamp: 1643086800000,
            value: 51.005911907497165
          },
          {
            timestamp: 1643173200000,
            value: 45.94711674861129
          },
          {
            timestamp: 1643259600000,
            value: 44.89931913961493
          },
          {
            timestamp: 1643346000000,
            value: 51.97576982910339
          },
          {
            timestamp: 1643605200000,
            value: 53.93606243035068
          }
        ]
      },
      status: 'OK',
      request_id: '9650502e6549a5ddbbb0d6fe31690908'
    }
  ],
  [
    'BCC',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/BCC/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 72.00263504611333
          },
          {
            timestamp: 1641272400000,
            value: 73.29111476360823
          },
          {
            timestamp: 1641358800000,
            value: 66.32956633528751
          },
          {
            timestamp: 1641445200000,
            value: 67.23722386319727
          },
          {
            timestamp: 1641531600000,
            value: 60.16152554978826
          },
          {
            timestamp: 1641790800000,
            value: 61.00072448534363
          },
          {
            timestamp: 1641877200000,
            value: 62.93466314739474
          },
          {
            timestamp: 1641963600000,
            value: 66.99613689478335
          },
          {
            timestamp: 1642050000000,
            value: 67.66801980322828
          },
          {
            timestamp: 1642136400000,
            value: 60.386589578204585
          },
          {
            timestamp: 1642482000000,
            value: 49.05440637447774
          },
          {
            timestamp: 1642568400000,
            value: 56.670232378042705
          },
          {
            timestamp: 1642654800000,
            value: 49.9005037998643
          },
          {
            timestamp: 1642741200000,
            value: 52.763383355135325
          },
          {
            timestamp: 1643000400000,
            value: 62.14711184171112
          },
          {
            timestamp: 1643086800000,
            value: 62.16606732862719
          },
          {
            timestamp: 1643173200000,
            value: 60.029439738202974
          },
          {
            timestamp: 1643259600000,
            value: 53.948236781972994
          },
          {
            timestamp: 1643346000000,
            value: 55.610660061273414
          },
          {
            timestamp: 1643605200000,
            value: 53.09769806334773
          }
        ]
      },
      status: 'OK',
      request_id: '6812b81cceb306a3213e3752af67c2ce'
    }
  ],
  [
    'SBLK',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/SBLK/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 95.74861367837337
          },
          {
            timestamp: 1641272400000,
            value: 95.89567604667124
          },
          {
            timestamp: 1641358800000,
            value: 81.26381345240117
          },
          {
            timestamp: 1641445200000,
            value: 76.63225043471937
          },
          {
            timestamp: 1641531600000,
            value: 76.04878203711297
          },
          {
            timestamp: 1641790800000,
            value: 71.50489114535347
          },
          {
            timestamp: 1641877200000,
            value: 75.56278207665453
          },
          {
            timestamp: 1641963600000,
            value: 72.10703163486055
          },
          {
            timestamp: 1642050000000,
            value: 55.490471887513415
          },
          {
            timestamp: 1642136400000,
            value: 61.683777023934525
          },
          {
            timestamp: 1642482000000,
            value: 53.15530115789662
          },
          {
            timestamp: 1642568400000,
            value: 53.08073938120812
          },
          {
            timestamp: 1642654800000,
            value: 53.71007646184532
          },
          {
            timestamp: 1642741200000,
            value: 45.036131533942275
          },
          {
            timestamp: 1643000400000,
            value: 47.1796329428943
          },
          {
            timestamp: 1643086800000,
            value: 45.60628188333531
          },
          {
            timestamp: 1643173200000,
            value: 43.69587279132603
          },
          {
            timestamp: 1643259600000,
            value: 55.292562040626194
          },
          {
            timestamp: 1643346000000,
            value: 60.65842452783015
          },
          {
            timestamp: 1643605200000,
            value: 58.890031209181615
          }
        ]
      },
      status: 'OK',
      request_id: '260ea1d6ff96ba91bf24c634c86a56e7'
    }
  ],
  [
    'SBLK',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/SBLK/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 95.74861367837337
          },
          {
            timestamp: 1641272400000,
            value: 95.89567604667124
          },
          {
            timestamp: 1641358800000,
            value: 81.26381345240117
          },
          {
            timestamp: 1641445200000,
            value: 76.63225043471937
          },
          {
            timestamp: 1641531600000,
            value: 76.04878203711297
          },
          {
            timestamp: 1641790800000,
            value: 71.50489114535347
          },
          {
            timestamp: 1641877200000,
            value: 75.56278207665453
          },
          {
            timestamp: 1641963600000,
            value: 72.10703163486055
          },
          {
            timestamp: 1642050000000,
            value: 55.490471887513415
          },
          {
            timestamp: 1642136400000,
            value: 61.683777023934525
          },
          {
            timestamp: 1642482000000,
            value: 53.15530115789662
          },
          {
            timestamp: 1642568400000,
            value: 53.08073938120812
          },
          {
            timestamp: 1642654800000,
            value: 53.71007646184532
          },
          {
            timestamp: 1642741200000,
            value: 45.036131533942275
          },
          {
            timestamp: 1643000400000,
            value: 47.1796329428943
          },
          {
            timestamp: 1643086800000,
            value: 45.60628188333531
          },
          {
            timestamp: 1643173200000,
            value: 43.69587279132603
          },
          {
            timestamp: 1643259600000,
            value: 55.292562040626194
          },
          {
            timestamp: 1643346000000,
            value: 60.65842452783015
          },
          {
            timestamp: 1643605200000,
            value: 58.890031209181615
          }
        ]
      },
      status: 'OK',
      request_id: '260ea1d6ff96ba91bf24c634c86a56e7'
    }
  ],
  [
    'EGLE',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/EGLE/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 88.40037418147806
          },
          {
            timestamp: 1641272400000,
            value: 85.97522569808947
          },
          {
            timestamp: 1641358800000,
            value: 83.082325399922
          },
          {
            timestamp: 1641445200000,
            value: 78.59459353054365
          },
          {
            timestamp: 1641531600000,
            value: 79.57699217930936
          },
          {
            timestamp: 1641790800000,
            value: 74.28324652896458
          },
          {
            timestamp: 1641877200000,
            value: 77.52890483692997
          },
          {
            timestamp: 1641963600000,
            value: 70.9696719753555
          },
          {
            timestamp: 1642050000000,
            value: 59.75976329014975
          },
          {
            timestamp: 1642136400000,
            value: 63.963190157521446
          },
          {
            timestamp: 1642482000000,
            value: 56.919771757696886
          },
          {
            timestamp: 1642568400000,
            value: 55.23267829004542
          },
          {
            timestamp: 1642654800000,
            value: 54.87207376353717
          },
          {
            timestamp: 1642741200000,
            value: 44.501857027524984
          },
          {
            timestamp: 1643000400000,
            value: 46.74439456657806
          },
          {
            timestamp: 1643086800000,
            value: 48.06277719178887
          },
          {
            timestamp: 1643173200000,
            value: 49.12839367245018
          },
          {
            timestamp: 1643259600000,
            value: 58.403064750101166
          },
          {
            timestamp: 1643346000000,
            value: 64.60177637945017
          },
          {
            timestamp: 1643605200000,
            value: 60.714216611810066
          }
        ]
      },
      status: 'OK',
      request_id: '97ee1e41d39ae6a3d1451bdbedbe4c45'
    }
  ],
  [
    'EGLE',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/EGLE/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 88.40037418147806
          },
          {
            timestamp: 1641272400000,
            value: 85.97522569808947
          },
          {
            timestamp: 1641358800000,
            value: 83.082325399922
          },
          {
            timestamp: 1641445200000,
            value: 78.59459353054365
          },
          {
            timestamp: 1641531600000,
            value: 79.57699217930936
          },
          {
            timestamp: 1641790800000,
            value: 74.28324652896458
          },
          {
            timestamp: 1641877200000,
            value: 77.52890483692997
          },
          {
            timestamp: 1641963600000,
            value: 70.9696719753555
          },
          {
            timestamp: 1642050000000,
            value: 59.75976329014975
          },
          {
            timestamp: 1642136400000,
            value: 63.963190157521446
          },
          {
            timestamp: 1642482000000,
            value: 56.919771757696886
          },
          {
            timestamp: 1642568400000,
            value: 55.23267829004542
          },
          {
            timestamp: 1642654800000,
            value: 54.87207376353717
          },
          {
            timestamp: 1642741200000,
            value: 44.501857027524984
          },
          {
            timestamp: 1643000400000,
            value: 46.74439456657806
          },
          {
            timestamp: 1643086800000,
            value: 48.06277719178887
          },
          {
            timestamp: 1643173200000,
            value: 49.12839367245018
          },
          {
            timestamp: 1643259600000,
            value: 58.403064750101166
          },
          {
            timestamp: 1643346000000,
            value: 64.60177637945017
          },
          {
            timestamp: 1643605200000,
            value: 60.714216611810066
          }
        ]
      },
      status: 'OK',
      request_id: '97ee1e41d39ae6a3d1451bdbedbe4c45'
    }
  ],
  [
    'AEO',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/AEO/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 60.77265973254086
          },
          {
            timestamp: 1641272400000,
            value: 62.04799292270265
          },
          {
            timestamp: 1641358800000,
            value: 53.48707607699359
          },
          {
            timestamp: 1641445200000,
            value: 52.27346771148298
          },
          {
            timestamp: 1641531600000,
            value: 48.92603078267373
          },
          {
            timestamp: 1641790800000,
            value: 45.62944523878899
          },
          {
            timestamp: 1641877200000,
            value: 50.599046444622054
          },
          {
            timestamp: 1641963600000,
            value: 45.136425676430925
          },
          {
            timestamp: 1642050000000,
            value: 49.66230966280718
          },
          {
            timestamp: 1642136400000,
            value: 48.18616682233506
          },
          {
            timestamp: 1642482000000,
            value: 44.09304868128594
          },
          {
            timestamp: 1642568400000,
            value: 42.420405092831196
          },
          {
            timestamp: 1642654800000,
            value: 33.71549031258033
          },
          {
            timestamp: 1642741200000,
            value: 33.204622499554986
          },
          {
            timestamp: 1643000400000,
            value: 48.19138040248511
          },
          {
            timestamp: 1643086800000,
            value: 51.042580712857436
          },
          {
            timestamp: 1643173200000,
            value: 45.22560689159085
          },
          {
            timestamp: 1643259600000,
            value: 46.38677064161527
          },
          {
            timestamp: 1643346000000,
            value: 44.093845351162635
          },
          {
            timestamp: 1643605200000,
            value: 47.05002489970996
          }
        ]
      },
      status: 'OK',
      request_id: '9f6691fd0ea6816c594e75025e7380dc'
    }
  ],
  [
    'CWH',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/CWH/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 65.17533252720679
          },
          {
            timestamp: 1641272400000,
            value: 53.76352336376891
          },
          {
            timestamp: 1641358800000,
            value: 52.25235044083315
          },
          {
            timestamp: 1641445200000,
            value: 54.615272018383834
          },
          {
            timestamp: 1641531600000,
            value: 50.31258952533752
          },
          {
            timestamp: 1641790800000,
            value: 48.695934848790166
          },
          {
            timestamp: 1641877200000,
            value: 43.5598127110681
          },
          {
            timestamp: 1641963600000,
            value: 44.85344684044255
          },
          {
            timestamp: 1642050000000,
            value: 45.90754737477874
          },
          {
            timestamp: 1642136400000,
            value: 42.04196531304031
          },
          {
            timestamp: 1642482000000,
            value: 37.25218061614839
          },
          {
            timestamp: 1642568400000,
            value: 37.15620621281997
          },
          {
            timestamp: 1642654800000,
            value: 25.2476653595956
          },
          {
            timestamp: 1642741200000,
            value: 21.949850736547774
          },
          {
            timestamp: 1643000400000,
            value: 36.78923778774791
          },
          {
            timestamp: 1643086800000,
            value: 34.99087838868509
          },
          {
            timestamp: 1643173200000,
            value: 33.21418361605174
          },
          {
            timestamp: 1643259600000,
            value: 33.788872893995006
          },
          {
            timestamp: 1643346000000,
            value: 34.39680978469434
          },
          {
            timestamp: 1643605200000,
            value: 37.78057988867347
          }
        ]
      },
      status: 'OK',
      request_id: '5b6c00ccb9d07fecd5c484b03d9f4352'
    }
  ],
  [
    'EOG',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/EOG/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 68.26683291770576
          },
          {
            timestamp: 1641272400000,
            value: 75.23392469496221
          },
          {
            timestamp: 1641358800000,
            value: 68.47214870792436
          },
          {
            timestamp: 1641445200000,
            value: 71.49877279709335
          },
          {
            timestamp: 1641531600000,
            value: 75.04601900028366
          },
          {
            timestamp: 1641790800000,
            value: 74.6669337856229
          },
          {
            timestamp: 1641877200000,
            value: 79.32354773445736
          },
          {
            timestamp: 1641963600000,
            value: 79.87212720808849
          },
          {
            timestamp: 1642050000000,
            value: 76.90379927513833
          },
          {
            timestamp: 1642136400000,
            value: 80.56981374558497
          },
          {
            timestamp: 1642482000000,
            value: 80.60634388836705
          },
          {
            timestamp: 1642568400000,
            value: 78.46172219667864
          },
          {
            timestamp: 1642654800000,
            value: 72.21585750276623
          },
          {
            timestamp: 1642741200000,
            value: 62.74493307155348
          },
          {
            timestamp: 1643000400000,
            value: 65.58978249916365
          },
          {
            timestamp: 1643086800000,
            value: 71.9475080460722
          },
          {
            timestamp: 1643173200000,
            value: 72.64120070081438
          },
          {
            timestamp: 1643259600000,
            value: 75.13295635410367
          },
          {
            timestamp: 1643346000000,
            value: 74.96734798522552
          },
          {
            timestamp: 1643605200000,
            value: 76.91791766432641
          }
        ]
      },
      status: 'OK',
      request_id: 'dde365fd2d7cb7f4bfaf19338f71de04'
    }
  ],
  [
    'EOG',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/EOG/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 68.26683291770576
          },
          {
            timestamp: 1641272400000,
            value: 75.23392469496221
          },
          {
            timestamp: 1641358800000,
            value: 68.47214870792436
          },
          {
            timestamp: 1641445200000,
            value: 71.49877279709335
          },
          {
            timestamp: 1641531600000,
            value: 75.04601900028366
          },
          {
            timestamp: 1641790800000,
            value: 74.6669337856229
          },
          {
            timestamp: 1641877200000,
            value: 79.32354773445736
          },
          {
            timestamp: 1641963600000,
            value: 79.87212720808849
          },
          {
            timestamp: 1642050000000,
            value: 76.90379927513833
          },
          {
            timestamp: 1642136400000,
            value: 80.56981374558497
          },
          {
            timestamp: 1642482000000,
            value: 80.60634388836705
          },
          {
            timestamp: 1642568400000,
            value: 78.46172219667864
          },
          {
            timestamp: 1642654800000,
            value: 72.21585750276623
          },
          {
            timestamp: 1642741200000,
            value: 62.74493307155348
          },
          {
            timestamp: 1643000400000,
            value: 65.58978249916365
          },
          {
            timestamp: 1643086800000,
            value: 71.9475080460722
          },
          {
            timestamp: 1643173200000,
            value: 72.64120070081438
          },
          {
            timestamp: 1643259600000,
            value: 75.13295635410367
          },
          {
            timestamp: 1643346000000,
            value: 74.96734798522552
          },
          {
            timestamp: 1643605200000,
            value: 76.91791766432641
          }
        ]
      },
      status: 'OK',
      request_id: 'dde365fd2d7cb7f4bfaf19338f71de04'
    }
  ],
  [
    'KR',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/KR/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 47.29542302357835
          },
          {
            timestamp: 1641272400000,
            value: 54.025127966496065
          },
          {
            timestamp: 1641358800000,
            value: 57.81355720657695
          },
          {
            timestamp: 1641445200000,
            value: 59.55216005883603
          },
          {
            timestamp: 1641531600000,
            value: 64.61781006165684
          },
          {
            timestamp: 1641790800000,
            value: 68.74849055745908
          },
          {
            timestamp: 1641877200000,
            value: 58.34429109175627
          },
          {
            timestamp: 1641963600000,
            value: 54.68925043389152
          },
          {
            timestamp: 1642050000000,
            value: 64.51674801291585
          },
          {
            timestamp: 1642136400000,
            value: 62.278783745247395
          },
          {
            timestamp: 1642482000000,
            value: 59.03219227225878
          },
          {
            timestamp: 1642568400000,
            value: 58.969728894401015
          },
          {
            timestamp: 1642654800000,
            value: 51.31028928398268
          },
          {
            timestamp: 1642741200000,
            value: 49.46179065714681
          },
          {
            timestamp: 1643000400000,
            value: 53.578415191863776
          },
          {
            timestamp: 1643086800000,
            value: 41.55037267229114
          },
          {
            timestamp: 1643173200000,
            value: 39.04729221024921
          },
          {
            timestamp: 1643259600000,
            value: 44.31171261776289
          },
          {
            timestamp: 1643346000000,
            value: 37.680200260501216
          },
          {
            timestamp: 1643605200000,
            value: 38.29849905093539
          }
        ]
      },
      status: 'OK',
      request_id: '8a978b1fc31f4d4d9f11410a6e8a59fa'
    }
  ],
  [
    'MATX',
    {
      results: {
        underlying: {
          url: 'https://api.polygon.io/v2/aggs/ticker/MATX/range/1/day/1634788800000/1643673600000?limit=165&sort=asc'
        },
        values: [
          {
            timestamp: 1641186000000,
            value: 69.94082840236683
          },
          {
            timestamp: 1641272400000,
            value: 73.30854417589521
          },
          {
            timestamp: 1641358800000,
            value: 67.2816714128369
          },
          {
            timestamp: 1641445200000,
            value: 62.81724499594852
          },
          {
            timestamp: 1641531600000,
            value: 60.36788653695912
          },
          {
            timestamp: 1641790800000,
            value: 57.24647285733851
          },
          {
            timestamp: 1641877200000,
            value: 60.27234569640979
          },
          {
            timestamp: 1641963600000,
            value: 58.54737506399502
          },
          {
            timestamp: 1642050000000,
            value: 60.97886939120079
          },
          {
            timestamp: 1642136400000,
            value: 55.23830331953757
          },
          {
            timestamp: 1642482000000,
            value: 49.498480098163476
          },
          {
            timestamp: 1642568400000,
            value: 51.30449644082714
          },
          {
            timestamp: 1642654800000,
            value: 64.40025299663256
          },
          {
            timestamp: 1642741200000,
            value: 62.95221374629186
          },
          {
            timestamp: 1643000400000,
            value: 62.5050329876844
          },
          {
            timestamp: 1643086800000,
            value: 64.21091521283668
          },
          {
            timestamp: 1643173200000,
            value: 69.72342069692553
          },
          {
            timestamp: 1643259600000,
            value: 65.33107735830998
          },
          {
            timestamp: 1643346000000,
            value: 72.39295517774406
          },
          {
            timestamp: 1643605200000,
            value: 70.93831352169028
          }
        ]
      },
      status: 'OK',
      request_id: 'da860cfbbc258d4536ba715d1a9296bb'
    }
  ],
  ['GOGL', { results: { underlying: { url: 'https://api.polygon.io/v2/aggs/ticker/GOGL/range/1/day/1634788800000/1643673600000?limit=165\u0026sort=asc' }, values: [{ timestamp: 1641186000000, value: 100 }, { timestamp: 1641272400000, value: 100 }, { timestamp: 1641358800000, value: 79.09923472588133 }, { timestamp: 1641445200000, value: 80.9490020612632 }, { timestamp: 1641531600000, value: 82.87765271998505 }, { timestamp: 1641790800000, value: 75.58767810168939 }, { timestamp: 1641877200000, value: 77.3593674663724 }, { timestamp: 1641963600000, value: 78.0806850780113 }, { timestamp: 1642050000000, value: 59.077842637661014 }, { timestamp: 1642136400000, value: 61.11610191400434 }, { timestamp: 1642482000000, value: 53.80473729707876 }, { timestamp: 1642568400000, value: 53.804737297078745 }, { timestamp: 1642654800000, value: 50.314346885505934 }, { timestamp: 1642741200000, value: 42.76640487937192 }, { timestamp: 1643000400000, value: 41.78201402195675 }, { timestamp: 1643086800000, value: 42.99325066045849 }, { timestamp: 1643173200000, value: 43.41585119102131 }, { timestamp: 1643259600000, value: 53.75356948331574 }, { timestamp: 1643346000000, value: 58.94614697389019 }, { timestamp: 1643605200000, value: 56.11875365497865 }] }, status: 'OK', request_id: '341fb9e5ef999f4649dbd8d1e06eb51c' }],
  ['STRL', { results: { underlying: { url: 'https://api.polygon.io/v2/aggs/ticker/STRL/range/1/day/1634788800000/1643673600000?limit=165\u0026sort=asc' }, values: [{ timestamp: 1641186000000, value: 53.6231884057971 }, { timestamp: 1641272400000, value: 54.96506249384904 }, { timestamp: 1641358800000, value: 48.04936964362528 }, { timestamp: 1641445200000, value: 59.26038740357526 }, { timestamp: 1641531600000, value: 50.19962786839952 }, { timestamp: 1641790800000, value: 49.9844545983246 }, { timestamp: 1641877200000, value: 52.8159205555269 }, { timestamp: 1641963600000, value: 54.0548739185379 }, { timestamp: 1642050000000, value: 56.05398771618408 }, { timestamp: 1642136400000, value: 57.35029598572815 }, { timestamp: 1642482000000, value: 55.23028767400837 }, { timestamp: 1642568400000, value: 56.07446499577374 }, { timestamp: 1642654800000, value: 51.31126596756432 }, { timestamp: 1642741200000, value: 46.34321831389161 }, { timestamp: 1643000400000, value: 50.79016298862901 }, { timestamp: 1643086800000, value: 48.020756408071726 }, { timestamp: 1643173200000, value: 48.23786446802609 }, { timestamp: 1643259600000, value: 40.21777672579343 }, { timestamp: 1643346000000, value: 39.47379712212815 }, { timestamp: 1643605200000, value: 41.713206770004916 }] }, status: 'OK', request_id: 'd7a522528d624694cc87566a92c9867f' }]
];



((records) => {
  const getFilePath = (ticker) => path.join(__dirname, `${ticker}.json`);
  for (const record of records) {
    const [ticker, response] = record;
    const filePath = getFilePath(ticker);
    fs.writeFileSync(filePath, JSON.stringify(response, null, 2), 'utf8');
  }
})(RSIByTickers)