<template>
  <div id="sc-page-wrapper" class="uk-flex uk-flex-column sc-filtered-items">
    <div id="sc-page-top-bar" class="sc-top-bar">
      <div class="sc-top-bar-content">
        <a href="javascript:void(0)"
           data-uk-tooltip="Back"
           title="Back"
           class="sc-actions-icon waves-effect waves-block"
           aria-expanded="false"
        ><i class="mdi mdi-arrow-left"></i></a>
      </div>
      <div class="sc-top-bar-aside uk-visible@l"></div>
      <div class="sc-top-bar-content uk-flex-1">
      </div>
    </div> <div class="uk-flex uk-height-1-1">
      <div id="sc-page-aside" class="uk-visible@m">
        <div class="sc-page-aside-body">
          <ul data-uk-accordion="multiple: true" class="uk-margin-top uk-accordion" style="display: none;">
            <li class="uk-open">
              <a href="javascript:void(0)" class="uk-accordion-title">
                Folders
              </a> <div class="uk-accordion-content" aria-hidden="false">
                <ul class="uk-list">
                  <li>
                    <a href="javascript:void(0)"><i class="mdi mdi-inbox uk-margin-small-right"></i>Inbox (24)
                    </a>
                  </li> <li>
                    <a href="javascript:void(0)"><i class="mdi mdi-inbox-arrow-up uk-margin-small-right"></i>Sent
                    </a>
                  </li> <li>
                    <a href="javascript:void(0)"><i class="mdi mdi-block-helper uk-margin-small-right sc-icon-22"></i>Spam
                    </a>
                  </li> <li>
                    <a href="javascript:void(0)"><i class="mdi mdi-delete uk-margin-small-right"></i>Trash
                    </a>
                  </li>
                </ul>
              </div>
            </li> <li class="uk-open">
              <a href="javascript:void(0)" class="uk-accordion-title">
                Tags
              </a> <div class="uk-accordion-content" aria-hidden="false">
                <ul class="uk-list">
                  <li data-uk-filter-control="" class="sc-js-filter-clear">
                    <a href="javascript:void(0)"><span class="sc-color-label md-bg-white sc-color-label-clear"></span>All Folders
                    </a>
                  </li> <li data-uk-filter-control="filter: .sc-js-tag-work">
                    <a href="javascript:void(0)"><span class="sc-color-label md-bg-blue-400"></span>
                      Work
                    </a>
                  </li><li data-uk-filter-control="filter: .sc-js-tag-todo" class="uk-active">
                    <a href="javascript:void(0)"><span class="sc-color-label md-bg-green-400"></span>
                      To Do
                    </a>
                  </li><li data-uk-filter-control="filter: .sc-js-tag-important" class="">
                    <a href="javascript:void(0)"><span class="sc-color-label md-bg-amber-400"></span>
                      Important
                    </a>
                  </li><li data-uk-filter-control="filter: .sc-js-tag-personal" class="">
                    <a href="javascript:void(0)"><span class="sc-color-label md-bg-red-400"></span>
                      Personal
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div> <div id="sc-page-content" class="sc-padding-remove uk-height-1-1">
        <div class="sc-message-card sc-message-expanded-single" style="min-height: 850px">
          <div data-uk-grid="" class="uk-flex uk-flex-middle sc-message-head uk-grid-collapse uk-grid" style="transition-delay: 140ms;">
            <div class="uk-flex-1 uk-text-truncate uk-first-column">
              <h2 title="แจ้งปัญหาระบบไวไฟขัดข้อง ที่โรงเรียนเชียงราย" class="sc-message-title uk-text-truncate">
                แจ้งปัญหาระบบไวไฟขัดข้อง ที่โรงเรียนเชียงราย
              </h2> <span class="uk-label uk-margin-small-right md-bg-green-400">
                To Do
              </span> <span class="uk-text-small uk-text-muted">
                usertest0135@gmail.com
              </span>
            </div> <div class="sc-message-date">
              Sat, Feb 16th 16:17
            </div>
          </div>
          <div class="sc-message-content" style="transition-delay: 300ms;">
            <p>สำหรับปัญหา ต่อ Wifi หรือ Wireless ไม่ยอมทำงานนี้ หากจะหาสาเหตุนั้นอาจจะเกิดได้จากหลายสาเหตุไม่ว่าจะเป็น ตัววินโดวส์เองหรือแม้กระทั่งไดร์เวอร์ แต่ถึงแม้ว่าเราจะติดตั้งไดร์เวอร์ใหม่ที่ถูกต้องตรงรุ่นแล้วก็ยังไม่สามารถใช้งานได้ เราก็มีอีกหนึ่งวิธีให้ทุกท่านได้ลองแก้ไข เพิ่มความเร็วเน็ต WiFi ดู แต่จากที่ช่วยเหลือหลายๆท่านมา จะเกิดจากตัว วินโดวส์ที่ติดตั้งไม่สมบูรณ์หรือมีไฟล์ขาดหายและไดร์เวอร์ติดตั้งไม่ตรงรุ่นเองซะส่วนใหญ่ ส่วนน้อยนักที่จะมาถึงการแก้ไขต่อ Wifiโดยใช้ขั้นตอนนี้</p>
          </div>
          <div class="sc-message-footer">
            <div class="uk-margin-bottom">
              <ul>
                <li>คุณ ใจดี ดีใจ</li>
                <li>Mobile : 0800001148</li>
                <li>
                  Address : 3/104 Ladprao 31 Chandrakasem
                  Chatuchak, Bangkok, Thailand 10900
                </li>
              </ul>
            </div>
            <div class="sc-message-reply uk-visible@m" style="transition-delay: 600ms;">
              <div class="sc-input-wrapper">
                <textarea name="" placeholder="Detail To Ticket..." rows="4" class="uk-textarea sc-vue-input uk-margin-top"></textarea> <span class="sc-input-bar"></span>
              </div>
              <div class="uk-margin-small-top">
                <button class="sc-button sc-button-primary">
                  Send To Ticket
                </button>
              </div>
            </div>
          </div>
        </div> <ul hidden="hidden" class="sc-js-message-filter"></ul>
      </div>
    </div>  <!---->
  </div>
</template>
<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
	@import "~scss/common/md_colors";
	@import "~scss/common/variables_mixins";
	@import "~scss/pages/mailbox";
</style>
