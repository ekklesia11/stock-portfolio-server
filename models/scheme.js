// scheme
module.exports = {
  users: `create table if not exists users(
    id int(4) primary key auto_increment,
    reg_date datetime not null default current_timestamp,
    name varchar(10) not null,
    email varchar(50) not null,
    password text,
    platform varchar(12),
    token text,
    status int(4) default 1
  )`,
  assets: `create table if not exists assets(
    id int(4) primary key auto_increment,
    reg_date timestamp not null default current_timestamp,
    total_cash_value text not null default "",
    total_stock_value text not null default "",
    total_investment text not null default "",
    profit text not null default "",
    profit_rate float not null default 0,
    dividend_per_share text not null default "",
    user_id int(4),
    foreign key (user_id)
      references users(id)
      on update restrict
      on delete cascade
  )`,
  stock_class: `create table if not exists stock_class(
    id int(4) primary key auto_increment,
    class varchar(24) not null
  )`,
  stock_items: `create table if not exists stock_items(
    id int(4) primary key auto_increment,
    item_name varchar(24) not null,
    item_code varchar(12) not null
  )`,
  user_class: `create table if not exists user_class(
    id int(4) primary key auto_increment,
    stock_class_id int(4),
    user_id int(4),
    foreign key (stock_class_id)
      references stock_class(id)
      on update restrict
      on delete cascade,
    foreign key (user_id)
      references users(id)
      on update restrict
      on delete cascade
  )`,
  user_stock: `create table if not exists user_stock(
    id int(4) primary key auto_increment,
    created_at timestamp default current_timestamp,
    stock_quantity int not null default 1,
    purchase_date datetime not null,
    price int not null,
    user_id int(4),
    stock_class_id int(4),
    stock_items_id int(4),
    foreign key (user_id)
      references users(id)
      on update restrict
      on delete cascade,
    foreign key (stock_class_id)
      references stock_class(id)
      on update restrict
      on delete cascade,
    foreign key (stock_items_id)
      references stock_items(id)
      on update restrict
      on delete cascade
  )`,
};
