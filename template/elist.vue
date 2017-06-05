<template>
	<div id="dropdown" class="eContent">
		<div class="loading" v-if="showLoading"><img :src="loadImg" /></div>
		<div v-for="news in newss">
			<div class="listInfo">
				<div class="eTitle">
					<router-link class="jump" :to="'/detail/'+news.id">
						<p v-html="news.title"></p>
					</router-link>
					<span class="time" v-html="news.time"></span>
				</div>
				<div class="listImg">
					<img :src="news.imgurl" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
				return {
					loadImg: require("../img/loading.gif"),
					page: 1,
					limit: 10,
					newss: [],
					showLoading: true
				}

			},
			computed: {

			},
			methods: {
				getlistInfo() {
					var type = this.$store.state.type;
					//					console.log(type)
					this.showLoading = true;
					if(this.$route.path == "/index/travel") {
						type = "travel"
					}
					var self = this;
					setTimeout(function() {
						$.ajax({
							type: "GET",
							url: "http://wangyi.butterfly.mopaasapp.com/news/api",
							data: {
								type: type,
								page: self.page,
								limit: self.limit
							},
							dataType: "json",
							success: function(data) {
								self.newss = self.newss.concat(data.list)
								self.showLoading = false
									//								console.log(data)
							}
						})
					}, 500);
				},
				dropdown() {
					//					console.log($("#dropdown").get(0).scrollTop)
					var refreshEl = $("#dropdown").get(0)
					var height = refreshEl.clientHeight;
					var scrollTop = refreshEl.scrollTop;
					var scrollHeight = refreshEl.scrollHeight;
					//滚动刷新条件
					if(scrollHeight - scrollTop - height <= 10) {
						this.page++;
						this.getlistInfo()
					}
				}
			},
			mounted() {
				this.getlistInfo();
				console.log(this.$route.path)
					//				滚动加载
					//				console.log($("#dropdown").get(0).scrollHeight)
				$("#dropdown").get(0).addEventListener("scroll", this.dropdown)

			},
	}
</script>
<style>
	.eContent {
		position: absolute;
		top: 48px;
		left: 0;
		right: 0;
		max-width: 450px;
		margin: auto;
		box-sizing: border-box;
		padding: 0 20px;
		overflow: auto;
		height: 100%;
		border: 1px solid #474a4f;
	}
	.eContent::-webkit-scrollbar-track
	{
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
		background-color: #ccc;
	}
	
	.eContent::-webkit-scrollbar
	{
		width: 2px;
		background-color: #474a4f;
	}
	
	.eContent::-webkit-scrollbar-thumb
	{
		background-color: #474a4f;
	}
	.time{
		font-size: 14px;
	}
	.loading {
		width: 80px;
		height: 80px;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -40px;
		margin-top: -80px;
	}
	
	@keyframes rotating {
		from {
			transform: rotate(0)
		}
		to {
			transform: rotate(360deg)
		}
	}
	
	.loading img {
		width: 100%;
		height: 100%;
		/*animation: rotating 1.5s linear infinite;*/
	}
	
	.listInfo {
		width: 100%;
		height: 120px;
		border: 1px solid #474a4f;
		border-radius: 15px;
	}
	
	.listInfo:first-child {
		margin-top: 20px;
	}
	
	.listInfo .eTitle {
		float: left;
		width: 50%;
		margin-left: 5%;
	}
	
	.listInfo p {
		font-size: 14px;
		line-height: 1.5;
		word-wrap: break-word;
		width: 100%;
		height: 85px;
		margin: 0;
		box-sizing: border-box;
		padding-top: 20px;
	}
	
	.listImg {
		width: 45%;
		height: 120px;
		display: inline-block;
		float: right;
		padding: 15px 10px;
		box-sizing: border-box;
	}
	
	.listInfo .listImg img {
		width: 100%;
		height: 100%;
	}
	
	.jump {
		color: black;
	}
</style>