<template>
  <v-container>
    <div>
      <img src="../../assets/logo.png" alt="logo">
    </div>
    <div class="page_box">
      <h2>CS Center</h2>
    </div>
    <div class="cs_wrapper">
      <div class="contents  mr-10">
        <div class="cs_conter">
          <p>
            TEL.
            <span>1234-4567</span>
          </p>
        </div>
        <div class="txt_pr mt-5">
          안녕하세요!<br>
          WMC 고객센터 입니다.
        </div>
      </div>
      <div class="cs_menu">
        <div class="row">
          <div class="col-md-6">
            <ul class="no_dot">
              <li>
                <router-link to="/notice-list" class="no_underline" style="color: black;">Notice</router-link>
                <span>공지사항</span>
              </li>

              <li>
                <router-link to="/question-board" class="no_underline" style="color: black;">Q&A</router-link>
                <span>Q&A</span>
              </li>
  

              <li>
                <router-link to="#" class="no_underline" style="color: black;">addcontent</router-link>
                <span>추가할것</span>
              </li>

              <li>
                <router-link to="#" class="no_underline" style="color: black;">addcontent</router-link>
                <span>추가할것</span>
              </li>
            </ul>
          </div>

          <div class="col-md-6">
            <ul class="no_dot">
              <li>
                <router-link to="#" class="no_underline" style="color: black;">addcontent</router-link>
                <span>추가할것</span>
              </li>

              <li>
                <router-link to="#" class="no_underline" style="color: black;">addcontent</router-link>
                <span>추가할것</span>
              </li>

              <li>
                <router-link to="#" class="no_underline" style="color: black;">addcontent</router-link>
                <span>추가할것</span>
              </li>

              <li>
                <router-link to="#" class="no_underline" style="color: black;">addcontent</router-link>
                <span>추가할것</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>
  
  
<script>
export default {

}
</script>
  
<style scoped>
.page_box {
  border: 2px solid #b2b2b2b2;
  border-bottom: none;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.page_box h2 {
  margin: 0;
}

.cs_conter {
  font-size: 20px;
}

.cs_conter p {
  margin: 0;
}

.cs_conter span {
  font-weight: bold;
  font-size: 30px;
  margin-right: 10px;
}

.cs_menu_list {
  display: flex;
}

.no_dot {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.no_dot li {
  position: relative;
  margin-bottom: 10px;
}

.no_dot li::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 110%;
  height: 1px;
  background-color: #b2b2b2b2;
}

.cs_wrapper {
  display: flex;
  border: 2px solid #b2b2b2b2;
  padding: 10px;
}

.cs_menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.cs_menu li {
  display: flex;
  align-items: center;
  flex-basis: 50%;
  margin-bottom: 5px;
}

.cs_menu li span {
  color: #999999;
  margin-left: 5px;
}

.cs_menu li router-link {
  margin-right: 5px;
  text-decoration: none;
}

.no_underline {
  text-decoration: none;
}
</style>

